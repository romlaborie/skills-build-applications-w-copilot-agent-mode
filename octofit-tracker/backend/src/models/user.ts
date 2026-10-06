import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: { type: String, required: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    profile: {
      fitnessGoal: { type: String, required: true, trim: true },
      level: { type: String, required: true, trim: true },
    },
  },
  { timestamps: true },
)

export const User = mongoose.models.User || mongoose.model('User', userSchema)