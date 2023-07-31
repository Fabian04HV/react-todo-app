import React from "react"
import { useState, useEffect } from "react"
const ThemeContext = React.createContext()

const ThemeProviderWrapper = (props) => {
  const [darkmode, setDarkmode] = useState(true)

  const toggleDarkmodeHandler = () => {
    const newDarkmode = !darkmode
    localStorage.setItem('darkmode', newDarkmode)
    setDarkmode(newDarkmode)
  }
  
  useEffect(() => {
    const storedDarkmode = localStorage.getItem('darkmode')
    if (storedDarkmode) {
      const parsedDarkmode = JSON.parse(storedDarkmode)
      setDarkmode(parsedDarkmode)
    }
  }, [])
  
  useEffect(() => {
    if (darkmode) {
      document.body.classList.add('darkmode')
    } else {
      document.body.classList.remove('darkmode')
    }
  }, [darkmode])

  return (
    <ThemeContext.Provider
      value={{ toggleDarkmodeHandler }}
    >
      {props.children}
    </ThemeContext.Provider>
  )
}

export { ThemeProviderWrapper, ThemeContext }
