import { useEffect, useState } from 'react'
import { apiUrl, collectionFromResponse } from '../api.js'
import { EmptyState, ErrorState, LoadingState } from './ResourceState.jsx'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadWorkouts() {
      try {
        const response = await fetch(apiUrl('/api/workouts/'))
        if (!response.ok) {
          throw new Error('Unable to load workouts')
        }
        const payload = await response.json()
        if (isMounted) {
          setWorkouts(collectionFromResponse(payload, 'workouts'))
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

    loadWorkouts()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className="container py-4 resource-page">
      <h1>Workouts</h1>
      {isLoading && <LoadingState label="workouts" />}
      {error && <ErrorState message={error} />}
      {!isLoading && !error && workouts.length === 0 && <EmptyState label="workouts" />}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-4" key={workout._id ?? workout.title}>
            <article className="resource-card p-3 h-100">
              <h2 className="h5">{workout.title}</h2>
              <p>{workout.focusArea}</p>
              <p className="resource-meta">{workout.difficulty} · {workout.estimatedMinutes} min</p>
            </article>
          </div>
        ))}
      </div>
    </main>
  )
}