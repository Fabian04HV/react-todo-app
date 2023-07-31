import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"

export const Login = () => {

  const navigate = useNavigate()
  const { authenticateUser } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleEmailInput = (e) => setEmail(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    let isError = false
    
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password })
    .then(response => {
      const authToken = response.data.authToken
      localStorage.setItem('authToken', authToken)
      authenticateUser()
      return authToken
    })
    .catch(err => {
      isError = true
      setErrorMessage(err.response.data.message)
    })
    .finally(() => {
      if (!isError) {
        navigate('/')
      }
    })
  }

  return(
    <div className="auth-form-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className="vertical-form">
        <input required onChange={handleEmailInput} type="email" placeholder="Email" />
        <input required onChange={handlePasswordInput} type="password" placeholder="Password" />
        <button type="submit" className="main-button">Login</button>
        <a className="secondary-text" href="/signup">to Signup</a>
      </form>
      <br/>
      {errorMessage && <p key={errorMessage} className="error-message">{errorMessage}</p>}
    </div>
  )
}