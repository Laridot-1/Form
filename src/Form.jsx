import React, { useState, useEffect } from 'react'

const Form = ({ handleLogin }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [signInInfo, setSignInInfo] = useState({
    username: "", password: ""
  })
  const [signUpInfo, setSignUpInfo] = useState({
    fullname: "", username: "", password: ""
  })
  const [signUpError, setSignUpError] = useState({
    fullname: false, username: false, password: false
  })
  const [signInError, setSignInError] = useState({
    username: false, password: false
  })

  const regex = {
    fullname: /^[A-Za-z]+ [A-Za-z]+$/,
    username: /^(?!\d+$)[a-zA-Z\d]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  }

  const handleSignUp = () => setIsFlipped(true)
  const handleSignIn = () => setIsFlipped(false)

  const signUpChange = (e) => {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value })
  }

  const signInChange = (e) => {
    setSignInInfo({ ...signInInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isFlipped) {
      // handle signup
      let newInfo = {}
      for (let i in signUpInfo) {
        if (signUpInfo[i] === "") {
          newInfo[i] = true
        }
        else if (!regex[i].test(signUpInfo[i])) {
          newInfo[i] = true
        }
        else {
          newInfo[i] = false
        }
      }
      setSignUpError(newInfo)

      // LocalStorage checking
      if (!newInfo.fullname && !newInfo.username && !newInfo.password) {
        localStorage.setItem("userInfo", JSON.stringify(signUpInfo))
        setTimeout(handleLogin, 2500)
      }
    }
    else {
      // handle sign in

      // Error checking
      let newInfo = {}
      for (let i in signInInfo) {
        if (signInInfo[i] === "") {
          newInfo[i] = true
        }
        else if (!regex[i].test(signInInfo[i])) {
          newInfo[i] = true
        }
        else {
          newInfo[i] = false
        }
      }
      setSignInError(newInfo)

      // LocalStorage checking
      if (!newInfo.username && !newInfo.password) {
        let data = localStorage.getItem("userInfo")
        if (!data) {
          alert("Not a user, sign up")
          return
        }
        const info = JSON.parse(data)
        if (signInInfo.username === info.username && signInInfo.password === info.password) {
          setTimeout(handleLogin, 2500)
        }
        else {
          alert("Invalid credentials")
        }
      }
    }
  }

  useEffect(() => {
    let id = setTimeout(() => {
      setSignInError({ username: false, password: false })
    }, 2000)

    return () => clearTimeout(id)
  }, [signInError])

  useEffect(() => {
    let id = setTimeout(() => {
      setSignUpError({ fullname: false, username: false, password: false })
    }, 2000)

    return () => clearTimeout(id)
  }, [signUpError])

  return (
    <form onSubmit={handleSubmit}>
      <h1>form</h1>
      {
        isFlipped ?
          <div className="sign-up form-control">
            <label>
              <input type="text" placeholder="full name" name="fullname" value={signUpInfo.fullname} onChange={signUpChange} className={signUpError.fullname ? "error" : ""} />
              {signUpError.fullname && <p>input a valid value</p>}
            </label>
            <label>
              <input type="text" placeholder="username" name="username" value={signUpInfo.username} onChange={signUpChange} className={signUpError.username ? "error" : ""} />
              {signUpError.username && <p>can't contain special characters or numbers only</p>}
            </label>
            <label>
              <input type="password" placeholder="password" name="password" value={signUpInfo.password} onChange={signUpChange} className={signUpError.password ? "error" : ""} />
              {signUpError.password && <p>at least one uppercase character, at least one lowercase character, at least 8 characters</p>}
            </label>
            <button type="submit" className="btn">sign up</button>
            <p>already have an account? {" "}
              <button type="button" className="redirect" onClick={handleSignIn}>sign in</button>
            </p>
            <p>by signing up, you're agreeing to our <a href="#">terms of service and conditions</a></p>
          </div>
          :
          <div className="sign-in form-control">
            <label>
              <input type="text" placeholder="username" name="username" value={signInInfo.username} onChange={signInChange} className={signInError.username ? "error" : ""} />
              {signInError.username && <p>can't contain special characters or numbers only</p>}
            </label>
            <label>
              <input type="password" placeholder="password" name="password" value={signInInfo.password} onChange={signInChange} className={signInError.password ? "error" : ""} />
              {signInError.password && <p>at least one uppercase character, at least one lowercase character, at least 8 characters</p>}
            </label>
            <button type="submit" className="btn">sign in</button>
            <p><a href="#">forgot passowrd?</a></p>
            <p>don't have an account yet? {" "}
              <button type="button" className="redirect" onClick={handleSignUp}>sign up</button>
            </p>
          </div>
      }
    </form>
  )
}

export default Form
