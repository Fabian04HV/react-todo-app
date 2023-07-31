import "../styles/LandingPage.css"

export const LandingPage = () => {
  return(
    <div className="LandingPage">
      <header>
        <h1>Hello there, <br/> welcome to this <span className="gradient-text">Todo Application</span> </h1>
        <p>Your one-stop destination for effortless productivity and seamless organization.</p>
        <br/>
        <div className="links-container">
        <a className="main-button" href="/login">Login</a>
        <a className="main-button" href="/signup">Sign up</a>
      </div>
      </header>
      <br/>
      <hr/>
      <h2>How it works</h2>
      
      <video muted autoPlay loop src="videos/todo-app-demo.mp4"></video>
       
      <hr/>
      
      <br/>
      <p>Tired of juggling multiple tasks and struggling to stay on top of your daily commitments? Say goodbye to chaos and <span className="gradient-text">embrace the power of todo-lists.</span>  The simplest way to stay on track, anywhere. Whether you're at home, in the office, or on the go, this Todo-App keeps you in sync with your todos across all your devices.</p>
      <p> <a href="/signup">Sign up for free</a>, create your first todo-list and embrace tradicional productivity.</p>
      <footer>
        <a className="secondary-text" href="/signup">sign up</a>
        <a className="secondary-text" href="/login">login</a>
        <a className="secondary-text" href="https://github.com/Fabian04HV/react-todo-app">code on github</a>
      </footer>
    </div>
  )
}