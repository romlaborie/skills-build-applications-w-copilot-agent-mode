import mongoose, { Schema } from 'mongoose'

const leaderboardSchema = new Schema(
  {
    rank: { type: Number, required: true, min: 1 },
    userName: { type: String, required: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 0 },
    weeklyMinutes: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
)

export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema)