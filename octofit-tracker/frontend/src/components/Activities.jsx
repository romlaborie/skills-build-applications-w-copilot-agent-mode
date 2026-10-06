import { useEffect, useState } from 'react'
import { apiUrl, collectionFromResponse } from '../api.js'
import { EmptyState, ErrorState, LoadingState } from './ResourceState.jsx'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadActivities() {
      try {
        const response = await fetch(apiUrl('/api/activities/'))
        if (!response.ok) {
          throw new Error('Unable to load activities')
        }
        const payload = await response.json()
        if (isMounted) {
          setActivities(collectionFromResponse(payload, 'activities'))
        }
      } catch (caughtError) {
        if (isMounted) {
          setError(caughtError.message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadActivities()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className="container py-4 resource-page">
      <h1>Activities</h1>
      {isLoading && <LoadingState label="activities" />}
      {error && <ErrorState message={error} />}
      {!isLoading && !error && activities.length === 0 && <EmptyState label="activities" />}
      <div className="row g-3">
        {activities.map((activity) => (
          <div className="col-md-6" key={activity._id ?? `${activity.userName}-${activity.activityDate}`}>
            <article className="resource-card p-3 h-100">
              <h2 className="h5">{activity.type}</h2>
              <p>{activity.userName} with {activity.teamName}</p>
              <p className="resource-meta">{activity.durationMinutes} min · {activity.caloriesBurned} calories</p>
            </article>
          </div>
        ))}
      </div>
    </main>
  )
}