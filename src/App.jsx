import React, { useState, useLayoutEffect } from 'react'
import Form from './Form'
import Profile from "./Profile"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => setIsLoggedIn(true)

  useLayoutEffect(() => {
    let data = localStorage.getItem("userInfo")
    if (data) setIsLoggedIn(true)
  }, [])

  return (
    <div className="container">
      {isLoggedIn ? <Profile /> : <Form handleLogin={handleLogin} />}
    </div>
  )
}

export default App
