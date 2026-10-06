import express from 'express'
import activitiesRouter from './routes/activities.js'
import leaderboardRouter from './routes/leaderboard.js'
import teamsRouter from './routes/teams.js'
import usersRouter from './routes/users.js'
import workoutsRouter from './routes/workouts.js'
import './config/database.js'

export const app = express()
export const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.get('/api/health', (_request, response) => {
  response.json({ apiBaseUrl: baseUrl, status: 'ok' })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening at ${baseUrl}`)
})