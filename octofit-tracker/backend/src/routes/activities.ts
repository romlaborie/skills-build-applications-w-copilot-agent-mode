import { Router } from 'express'
import { Activity } from '../models/activity.js'

const router = Router()

router.get('/', async (_request, response) => {
  const activities = await Activity.find().sort({ activityDate: -1 }).lean()
  response.json({ activities })
})

export default router