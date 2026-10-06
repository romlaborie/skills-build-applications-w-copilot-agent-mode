import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Seed the octofit_db database with test data');
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await Team.insertMany([
      {
        name: 'Velocity Vipers',
        city: 'Austin',
        motto: 'Fast reps, faster recovery',
        memberNames: ['Maya Chen', 'Jordan Lee'],
      },
      {
        name: 'Core Crushers',
        city: 'Seattle',
        motto: 'Strength in every streak',
        memberNames: ['Priya Patel', 'Noah Williams'],
      },
      {
        name: 'Trail Blazers',
        city: 'Denver',
        motto: 'Earn the climb',
        memberNames: ['Sofia Garcia'],
      },
    ]);

    await User.insertMany([
      {
        name: 'Maya Chen',
        email: 'maya.chen@octofit.test',
        role: 'team-captain',
        teamName: 'Velocity Vipers',
        profile: { fitnessGoal: 'Improve 10K pace', level: 'advanced' },
      },
      {
        name: 'Jordan Lee',
        email: 'jordan.lee@octofit.test',
        role: 'member',
        teamName: 'Velocity Vipers',
        profile: { fitnessGoal: 'Build endurance', level: 'intermediate' },
      },
      {
        name: 'Priya Patel',
        email: 'priya.patel@octofit.test',
        role: 'team-captain',
        teamName: 'Core Crushers',
        profile: { fitnessGoal: 'Increase functional strength', level: 'advanced' },
      },
      {
        name: 'Noah Williams',
        email: 'noah.williams@octofit.test',
        role: 'member',
        teamName: 'Core Crushers',
        profile: { fitnessGoal: 'Stay active during work travel', level: 'beginner' },
      },
      {
        name: 'Sofia Garcia',
        email: 'sofia.garcia@octofit.test',
        role: 'member',
        teamName: 'Trail Blazers',
        profile: { fitnessGoal: 'Prepare for mountain hiking', level: 'intermediate' },
      },
    ]);

    await Activity.insertMany([
      {
        userName: 'Maya Chen',
        teamName: 'Velocity Vipers',
        type: 'Run',
        durationMinutes: 42,
        caloriesBurned: 430,
        activityDate: new Date('2026-10-01T13:30:00Z'),
      },
      {
        userName: 'Jordan Lee',
        teamName: 'Velocity Vipers',
        type: 'Cycling',
        durationMinutes: 58,
        caloriesBurned: 520,
        activityDate: new Date('2026-10-02T21:00:00Z'),
      },
      {
        userName: 'Priya Patel',
        teamName: 'Core Crushers',
        type: 'Strength training',
        durationMinutes: 50,
        caloriesBurned: 410,
        activityDate: new Date('2026-10-03T12:15:00Z'),
      },
      {
        userName: 'Noah Williams',
        teamName: 'Core Crushers',
        type: 'Yoga',
        durationMinutes: 35,
        caloriesBurned: 160,
        activityDate: new Date('2026-10-04T14:45:00Z'),
      },
      {
        userName: 'Sofia Garcia',
        teamName: 'Trail Blazers',
        type: 'Hiking',
        durationMinutes: 95,
        caloriesBurned: 780,
        activityDate: new Date('2026-10-05T15:20:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { rank: 1, userName: 'Sofia Garcia', teamName: 'Trail Blazers', points: 1840, weeklyMinutes: 215 },
      { rank: 2, userName: 'Maya Chen', teamName: 'Velocity Vipers', points: 1715, weeklyMinutes: 198 },
      { rank: 3, userName: 'Priya Patel', teamName: 'Core Crushers', points: 1650, weeklyMinutes: 185 },
      { rank: 4, userName: 'Jordan Lee', teamName: 'Velocity Vipers', points: 1480, weeklyMinutes: 172 },
      { rank: 5, userName: 'Noah Williams', teamName: 'Core Crushers', points: 920, weeklyMinutes: 104 },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Run Builder',
        focusArea: 'Cardio endurance',
        difficulty: 'intermediate',
        estimatedMinutes: 45,
        exercises: [
          { name: 'Dynamic warmup', sets: 1, reps: '8 minutes' },
          { name: 'Tempo intervals', sets: 4, reps: '5 minutes' },
          { name: 'Cooldown jog', sets: 1, reps: '10 minutes' },
        ],
      },
      {
        title: 'Core Stability Circuit',
        focusArea: 'Core strength',
        difficulty: 'beginner',
        estimatedMinutes: 30,
        exercises: [
          { name: 'Plank hold', sets: 3, reps: '45 seconds' },
          { name: 'Dead bug', sets: 3, reps: '12 per side' },
          { name: 'Glute bridge', sets: 3, reps: '15 reps' },
        ],
      },
      {
        title: 'Mountain Legs',
        focusArea: 'Lower body power',
        difficulty: 'advanced',
        estimatedMinutes: 55,
        exercises: [
          { name: 'Weighted step-up', sets: 4, reps: '10 per leg' },
          { name: 'Walking lunge', sets: 4, reps: '16 steps' },
          { name: 'Calf raise', sets: 3, reps: '20 reps' },
        ],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
