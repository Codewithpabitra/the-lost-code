interface MissionTestCase {
  expectedOutput: string;
  hidden: boolean;
}

export interface MissionDefinition {
  chapterId: string;
  title: string;
  xp: number;
  testCases: MissionTestCase[];
}

interface Judge0Submission {
  token?: string;
  stdout?: string | null;
  stderr?: string | null;
  compile_output?: string | null;
  message?: string | null;
  status?: {
    id: number;
    description: string;
  };
}

export interface TestResult {
  passed: boolean;
  hidden: boolean;
}

export interface EvaluationResult {
  success: boolean;
  output: string;
  error: string | null;
  testResults: TestResult[];
  passedTests: number;
  totalTests: number;
}

// These values are server-controlled.
// Do not accept XP or expected output from the frontend.
export const SERVER_MISSIONS: MissionDefinition[] = [
  {
    chapterId: "origin-01",
    title: "The First Line",
    xp: 100,
    testCases: [{ expectedOutput: "Hello, World!", hidden: false }],
  },
  {
    chapterId: "origin-02",
    title: "Variables & Secrets",
    xp: 150,
    testCases: [{ expectedOutput: "The code lives!", hidden: false }],
  },
  {
    chapterId: "origin-03",
    title: "The Data Temple",
    xp: 200,
    testCases: [{ expectedOutput: "100", hidden: false }],
  },
  {
    chapterId: "syntax-01",
    title: "The Logic Gate",
    xp: 250,
    testCases: [{ expectedOutput: "Unlocked", hidden: false }],
  },
];

const JAVASCRIPT_LANGUAGE_ID = 63;
const MAX_CODE_LENGTH = 10_000;
const MAX_POLL_ATTEMPTS = 20;
const POLL_INTERVAL_MS = 500;

const sleep = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const normalizeOutput = (output: string) =>
  output.replace(/\r\n/g, "\n").replace(/\n+$/, "");

const getJudge0Config = () => {
  const baseUrl = process.env.JUDGE0_API_URL;

  if (!baseUrl) {
    throw new Error("JUDGE0_API_URL is missing");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (process.env.JUDGE0_API_TOKEN) {
    headers["X-Auth-Token"] = process.env.JUDGE0_API_TOKEN;
  }

  return {
    baseUrl: baseUrl.replace(/\/+$/, ""),
    headers,
  };
};

const judge0Request = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const { headers } = getJudge0Config();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const responseText = await response.text();

    console.error("Judge0 API error:", response.status, responseText);

    throw new Error("Code execution service is currently unavailable");
  }

  return response.json() as Promise<T>;
};

const executeJavaScript = async (code: string): Promise<Judge0Submission> => {
  const { baseUrl } = getJudge0Config();

  // Create a submission.
  const submission = await judge0Request<Judge0Submission>(
    `${baseUrl}/submissions?base64_encoded=false&wait=false`,
    {
      method: "POST",
      body: JSON.stringify({
        source_code: code,
        language_id: JAVASCRIPT_LANGUAGE_ID,
        cpu_time_limit: 2,
        cpu_extra_time: 0.5,
        wall_time_limit: 5,
        memory_limit: 128000,
      }),
    },
  );

  if (!submission.token) {
    throw new Error("Code execution submission could not be created");
  }

  // Poll until Judge0 finishes execution.
  for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++) {
    await sleep(POLL_INTERVAL_MS);

    const result = await judge0Request<Judge0Submission>(
      `${baseUrl}/submissions/${submission.token}?base64_encoded=false`,
      { method: "GET" },
    );

    // Status 1 = In Queue, 2 = Processing.
    if (result.status && result.status.id > 2) {
      return result;
    }
  }

  throw new Error("Code execution timed out. Please try again.");
};

export const getMission = (chapterId: string) => {
  return SERVER_MISSIONS.find((mission) => mission.chapterId === chapterId);
};

export const evaluateMission = async (
  chapterId: string,
  code: string,
): Promise<EvaluationResult> => {
  const mission = getMission(chapterId);

  if (!mission) {
    throw new Error("Mission not found");
  }

  if (typeof code !== "string" || !code.trim()) {
    throw new Error("Please write some JavaScript code first");
  }

  if (code.length > MAX_CODE_LENGTH) {
    throw new Error("Code is too long. Maximum length is 10,000 characters.");
  }

  const execution = await executeJavaScript(code);

  const statusId = execution.status?.id;
  const statusDescription = execution.status?.description ?? "Unknown error";

  const output = execution.stdout ?? "";

  // Judge0 status 3 means Accepted.
  // Other statuses include compilation error, runtime error,
  // time limit exceeded, and other execution failures.
  if (statusId !== 3) {
    const error =
      execution.compile_output ||
      execution.stderr ||
      execution.message ||
      statusDescription;

    return {
      success: false,
      output,
      error: error.trim(),
      testResults: [],
      passedTests: 0,
      totalTests: mission.testCases.length,
    };
  }

  const normalizedOutput = normalizeOutput(output);

  const testResults = mission.testCases.map((testCase) => ({
    passed: normalizedOutput === normalizeOutput(testCase.expectedOutput),
    hidden: testCase.hidden,
  }));

  const passedTests = testResults.filter((test) => test.passed).length;

  return {
    success: passedTests === mission.testCases.length,
    output,
    error: null,
    testResults,
    passedTests,
    totalTests: mission.testCases.length,
  };
};
