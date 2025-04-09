import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from "react-router-dom";
import Routing from '../components/Routes/Routing';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routing />
      </Router>
    </>
  )
}

export default App
