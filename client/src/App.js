import React, { useContext, useEffect, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { Home } from "./pages/Home"
import { Signup } from "./pages/Signup"
import { Login } from "./pages/Login"
import { AuthContext } from "./context/auth.context"
import { LandingPage } from "./pages/LandingPage"

function App() {
  const { user, isLoggedIn, isLoading} = useContext(AuthContext)

  const [renderedComponent, setRenderedComponent] = useState(null)

  useEffect(() => {
    if(isLoggedIn){
      setRenderedComponent(<Home />)
    }
    else{
      setRenderedComponent(<LandingPage/>)
    }
  }, [isLoggedIn])

  return (
    <Routes>
      <Route path="/" element={renderedComponent}/>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  )
}

export default App
