import { useState } from 'react'
import './App.css'
import { HomePage } from './pages/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <HomePage/>
    </div>
  )
}

export default App
