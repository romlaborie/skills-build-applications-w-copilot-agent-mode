import { Router } from 'express'
import { Leaderboard } from '../models/leaderboard.js'

const router = Router()

router.get('/', async (_request, response) => {
  const leaderboard = await Leaderboard.find().sort({ rank: 1 }).lean()
  response.json({ leaderboard })
})

export default router