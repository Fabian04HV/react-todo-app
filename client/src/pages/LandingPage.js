import "../styles/LandingPage.css"
import { ThemeContext } from "../context/theme.context"
import { useContext } from "react"

export const LandingPage = () => {

  const { toggleDarkmodeHandler } = useContext(ThemeContext)

  return(
    <div className="LandingPage">
      <header>
        <h1>Hello there, <br/> welcome to this <span className="gradient-text">Todo Application</span> </h1>
        <p className="subheading">Your one-stop destination for effortless productivity and seamless organization.</p>
        <br/>
        <div className="links-container">
          <a className="standard-button" href="/login">Login</a>
          <a className="standard-button" href="/signup">Sign up</a>
          <button title="darkmode" className="darkmode-button" onClick={toggleDarkmodeHandler}>
            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28"><path d="M524-40q-84 0-157.5-32t-128-86.5Q184-213 152-286.5T120-444q0-146 93-257.5T450-840q-18 98 11 192.635 29 94.635 100 165.736 71 71.101 165.5 100.143Q821-352.445 920-370.471q-26 144.206-138 237.338Q670-40 524-40Zm0-60q100 0 182-57t132-145q-90-8-173-41.5T518.5-440Q455-503 422-585.5T381-757q-88 48-144.5 130.5T180-444q0 143.333 100.333 243.667Q380.667-100 524-100Zm-6-340Z"/></svg>
          </button>
        </div>
      </header>
      <section>
        <br/>
        <hr/>
        <h2>How it works</h2>
        
        <video muted autoPlay loop src="videos/todo-app-demo.mp4"></video>
        
        <hr/>
        
        <br/>
        <p>Tired of juggling multiple tasks and struggling to stay on top of your daily commitments? Say goodbye to chaos and <span className="gradient-text">embrace the power of todo-lists.</span>  The simplest way to stay on track, anywhere. Whether you're at home, in the office, or on the go, this Todo-App keeps you in sync with your todos across all your devices.</p>
        <p> <a href="/signup">Sign up for free</a>, create your first todo-list and embrace tradicional productivity.</p>
      </section>
      
      <footer>
        <a className="secondary-text" href="/signup">sign up</a>
        <a className="secondary-text" href="/login">login</a>
        <a className="secondary-text" href="https://github.com/Fabian04HV/react-todo-app">code on github</a>
      </footer>
    </div>
  )
}