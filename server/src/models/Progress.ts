import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICompletedMission {
  chapterId: string;
  completedAt: Date;
  xpAwarded: number;
}

export interface IProgress extends Document {
  user: Types.ObjectId;
  xp: number;
  completedMissions: ICompletedMission[];
  createdAt: Date;
  updatedAt: Date;
}

const completedMissionSchema = new Schema<ICompletedMission>(
  {
    chapterId: {
      type: String,
      required: true,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
    xpAwarded: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const progressSchema = new Schema<IProgress>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    xp: {
      type: Number,
      default: 0,
      min: 0,
    },
    completedMissions: {
      type: [completedMissionSchema],
      default: [],
    },
  },
  { timestamps: true },
);

export const Progress = mongoose.model<IProgress>("Progress", progressSchema);
