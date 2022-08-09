import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Dashboard from './pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <Dashboard />
      </div>
    </div>
  )
}

export default App
