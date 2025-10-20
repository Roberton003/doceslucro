import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SinglePage from './components/SinglePage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <Routes>
          <Route path="/" element={<SinglePage />} />
          <Route path="/calcular" element={<SinglePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App