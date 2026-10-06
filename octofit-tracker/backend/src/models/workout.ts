import mongoose, { Schema } from 'mongoose'

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, trim: true },
    estimatedMinutes: { type: Number, required: true, min: 1 },
    exercises: [
      {
        name: { type: String, required: true, trim: true },
        sets: { type: Number, required: true, min: 1 },
        reps: { type: String, required: true, trim: true },
      },
    ],
  },
  { timestamps: true },
)

export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema)