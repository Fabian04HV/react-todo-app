import { useState } from "react"
import axios from "axios"

export const Signup = () =>{

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState("")

  const handleFirstnameInput = (e) => setFirstname(e.target.value)
  const handleLastnameInput = (e) => setLastname(e.target.value)
  const handleEmailInput = (e) => setEmail(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)

  const signupHandler = (e) => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {firstname, lastname, email, password})
    .then((response) => {
      console.log(response.data.user)
    })
    .catch((error) => {
      const errorDescription = error.response.data.message
      setErrorMessage(errorDescription)
    })
  }

  return(
    <div className="auth-form-container">
      <h1>Signup</h1>

      <form onSubmit={signupHandler} className="vertical-form">
        <input required onChange={handleFirstnameInput} type="text" placeholder="Firstname"/>
        <input required onChange={handleLastnameInput} type="text" placeholder="Lastname"/>
        <input required onChange={handleEmailInput} type="email" placeholder="Email"/>
        <input required onChange={handlePasswordInput} type="password" placeholder="Password"/>
        <button type="submit" className="main-button">Sign up</button>
      </form>
      <a href="/login">to Login</a>
      {errorMessage && <div>Error: {errorMessage}</div>}
    </div>
  )
}