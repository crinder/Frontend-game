import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from "react-router-dom";
import Routing from '../components/Routes/Routing';
import { AuthContext } from '../components/Context/authContext';
import 'react-loading-skeleton/dist/skeleton.css';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthContext>
        <Router>
          <Routing />
        </Router>
      </AuthContext>
    </>
  )
}

export default App
