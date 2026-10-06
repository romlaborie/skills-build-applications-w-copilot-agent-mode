import { useEffect, useState } from 'react'
import { apiUrl, collectionFromResponse } from '../api.js'
import { EmptyState, ErrorState, LoadingState } from './ResourceState.jsx'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadTeams() {
      try {
        const response = await fetch(apiUrl('/api/teams/'))
        if (!response.ok) {
          throw new Error('Unable to load teams')
        }
        const payload = await response.json()
        if (isMounted) {
          setTeams(collectionFromResponse(payload, 'teams'))
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

    loadTeams()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className="container py-4 resource-page">
      <h1>Teams</h1>
      {isLoading && <LoadingState label="teams" />}
      {error && <ErrorState message={error} />}
      {!isLoading && !error && teams.length === 0 && <EmptyState label="teams" />}
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-4" key={team._id ?? team.name}>
            <article className="resource-card p-3 h-100">
              <h2 className="h5">{team.name}</h2>
              <p>{team.city}</p>
              <p className="resource-meta">{team.motto}</p>
            </article>
          </div>
        ))}
      </div>
    </main>
  )
}