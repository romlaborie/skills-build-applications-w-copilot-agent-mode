export function LoadingState({ label }) {
  return <p className="resource-meta">Loading {label}...</p>
}

export function ErrorState({ message }) {
  return <p className="alert alert-danger mb-0">{message}</p>
}

export function EmptyState({ label }) {
  return <p className="resource-meta">No {label} found.</p>
}