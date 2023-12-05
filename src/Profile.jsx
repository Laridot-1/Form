import React, { useState } from 'react'

const Profile = () => {
  const [userInfo] = useState(() => {
    let { username } = JSON.parse(localStorage.getItem("userInfo"))
    return username
  })
  return (
    <h1>Hello {userInfo}</h1>
  )
}

export default Profile
