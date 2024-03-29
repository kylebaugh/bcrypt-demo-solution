import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = () => {
    let bodyObj = {
      username,
      password
    }

    axios.post('/api/register', bodyObj)
      .then((res) => {
        console.log(res.data)

        alert('registration complete')

        setUsername('')
        setPassword('')
      })

  }

  const handleLogin = () => {
    let bodyObj = {
      username,
      password
    }

    axios.post('/api/login', bodyObj)
      .then((res) => {
        console.log(res.data)

        alert('login successful')

        setUsername('')
        setPassword('')
      })
      .catch((err) => {
        console.log(err.response.data)
        alert(err.response.data)

        setUsername('')
        setPassword('')
      })
  }

  return (
    <>
      <input type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="text" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
    </>
  )
}

export default App
