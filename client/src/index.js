import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthProviderWrapper } from './context/auth.context'
import "./styles/index.css"
import { ThemeProviderWrapper } from './context/theme.context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <ThemeProviderWrapper>
      <AuthProviderWrapper>
        <App />
      </AuthProviderWrapper>
    </ThemeProviderWrapper>
  </BrowserRouter>
)