import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { apiRequest, TOKEN_KEY } from "../lib/api";

export interface Player {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: Player;
}

interface MeResponse {
  success: boolean;
  user: Player;
}

interface AuthContextType {
  user: Player | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Player | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY),
  );
  const [loading, setLoading] = useState(true);

  // Restore the player session on page refresh.
  useEffect(() => {
    const restoreSession = async () => {
      const savedToken = localStorage.getItem(TOKEN_KEY);

      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await apiRequest<MeResponse>("/auth/me");
        setUser(response.user);
        setToken(savedToken);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem(TOKEN_KEY, response.token);
    setToken(response.token);
    setUser(response.user);
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    const response = await apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });

    localStorage.setItem(TOKEN_KEY, response.token);
    setToken(response.token);
    setUser(response.user);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user && !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
