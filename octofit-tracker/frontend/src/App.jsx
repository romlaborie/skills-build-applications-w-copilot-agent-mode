import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<main className="container py-5"><h1>OctoFit Tracker</h1></main>} />
    </Routes>
  )
}

export default App
