import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const API_URL = process.env.REACT_APP_API_URL
const AuthContext = React.createContext()

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  const storeToken = (token) => {
    localStorage.setItem("authToken", token)
  }

  const removeToken = () => {
    localStorage.removeItem("authToken")
  }

  const authenticateUser = async () => {
    const storedToken = localStorage.getItem("authToken")
    if (storedToken) {
      try {
        const response = await axios.get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })

        const user = response.data
        setIsLoggedIn(true)
        setUser(user)
      } catch (error) {
        // Token expired or invalid, clear the token
        removeToken()
      } finally {
        setIsLoading(false)  // Authentication process is complete, set isLoading to false
      }
    } else {
      setIsLoading(false) // No stored token, set isLoading to false
    }
  }

  const logoutUser = () => {
    removeToken()
    setIsLoggedIn(false)
    setUser(null)
    navigate("/login")
  }

  useEffect(() => {
    authenticateUser().catch((error) => {
      // Handle any errors here, e.g., redirect to an error page
      setIsLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, user, storeToken, logoutUser, authenticateUser }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext }