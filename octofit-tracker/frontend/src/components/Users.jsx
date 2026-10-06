import { useEffect, useState } from 'react'
import { apiUrl, collectionFromResponse } from '../api.js'
import { EmptyState, ErrorState, LoadingState } from './ResourceState.jsx'

export default function Users() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadUsers() {
      try {
        const response = await fetch(apiUrl('/api/users/'))
        if (!response.ok) {
          throw new Error('Unable to load users')
        }
        const payload = await response.json()
        if (isMounted) {
          setUsers(collectionFromResponse(payload, 'users'))
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

    loadUsers()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className="container py-4 resource-page">
      <h1>Users</h1>
      {isLoading && <LoadingState label="users" />}
      {error && <ErrorState message={error} />}
      {!isLoading && !error && users.length === 0 && <EmptyState label="users" />}
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-6" key={user._id ?? user.email}>
            <article className="resource-card p-3 h-100">
              <h2 className="h5">{user.name}</h2>
              <p>{user.email}</p>
              <p className="resource-meta">{user.teamName} · {user.profile?.level}</p>
            </article>
          </div>
        ))}
      </div>
    </main>
  )
}