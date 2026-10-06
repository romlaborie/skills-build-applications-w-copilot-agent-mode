import mongoose, { Schema } from 'mongoose'

const activitySchema = new Schema(
  {
    userName: { type: String, required: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    activityDate: { type: Date, required: true },
  },
  { timestamps: true },
)

export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema)