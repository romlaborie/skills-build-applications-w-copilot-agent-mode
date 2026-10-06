import { useEffect, useState } from 'react'
import { apiUrl, collectionFromResponse } from '../api.js'
import { EmptyState, ErrorState, LoadingState } from './ResourceState.jsx'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadLeaderboard() {
      try {
        const response = await fetch(apiUrl('/api/leaderboard/'))
        if (!response.ok) {
          throw new Error('Unable to load leaderboard')
        }
        const payload = await response.json()
        if (isMounted) {
          setLeaderboard(collectionFromResponse(payload, 'leaderboard'))
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

    loadLeaderboard()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className="container py-4 resource-page">
      <h1>Leaderboard</h1>
      {isLoading && <LoadingState label="leaderboard entries" />}
      {error && <ErrorState message={error} />}
      {!isLoading && !error && leaderboard.length === 0 && <EmptyState label="leaderboard entries" />}
      <div className="list-group">
        {leaderboard.map((entry) => (
          <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id ?? entry.rank}>
            <div>
              <strong>#{entry.rank} {entry.userName}</strong>
              <p className="resource-meta mb-0">{entry.teamName} · {entry.weeklyMinutes} weekly minutes</p>
            </div>
            <span className="badge text-bg-primary rounded-pill">{entry.points} pts</span>
          </div>
        ))}
      </div>
    </main>
  )
}