import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/auth.context"
import "../styles/Home.css"
import axios from "axios"
import { fetchUsersTodos } from "../utils/todo.utils"
import { debounce } from 'lodash'

export const Home = () => {
  const { user, logoutUser } = useContext(AuthContext)
  const authToken = localStorage.getItem('authToken')
  const [showModal, setShowModal] = useState(false)

  const [todos, setTodos] = useState([])
  const [newTask, setNewTask] = useState('')

  const [fetchCompleted, setFetchCompleted] = useState(false)

  useEffect(() => {
    fetchUsersTodos(user._id)
      .then(response => {
        setTodos(response)
        setFetchCompleted(true)
      })

    return () => saveTodos()
  }, [])

  const saveTodos = () => {
    axios.put(`${process.env.REACT_APP_API_URL}/api/save-todos`, { todos }, { headers: { Authorization: `Bearer ${authToken}`}})
    .then((response) => {
      console.log("Saved: ", response.data.todos)
    })
    .catch(err => console.log(err))
  }

  const delayedSaveTodos = debounce(saveTodos, 1000)

  useEffect(() => {
    if (fetchCompleted) {
      delayedSaveTodos()
    }
  }, [todos])

  const handleNewTaskInput = (e) => setNewTask(e.target.value)
  const handleKeyDown = (e) => e.key == "Enter" && createTodo()

  const createTodo = () => {
    //prevent duplicates
    if(todos.find(todo => todo.task === newTask)){
      return 
    }

    const todo = {
      task: newTask,
      isCompleted: false
    }

    setTodos(prev => [...prev, todo])
    setNewTask('')
  }

  const deleteTodo = (task) => {
    const updatedTodos = todos.filter(todo => todo.task !== task);
    setTodos(updatedTodos)
  }

  const toggleTodoCompleted = (task) => {
    const updatedTodos = todos.map(todo => {
      if (todo.task === task) {
        // Create a new object with the updated isCompleted value
        return { ...todo, isCompleted: !todo.isCompleted }
      }
      else return todo
    });
    setTodos(updatedTodos)
  }

  if(!user){
    return <p>Loading...</p>
  }
  else return(
    <div className="Home">
      <nav>
        <button className="icon-center-button white-hover" title="Navigation">
          <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28"><path d="M150-240q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T150-300h660q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T810-240H150Zm0-210q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T150-510h660q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T810-450H150Zm0-210q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T150-720h660q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T810-660H150Z"/></svg>
        </button>
        <span>{user.firstname} {user.lastname}</span>
        <button className="white-hover" onClick={() => logoutUser()}>
        <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z"/></svg>
          Logout
        </button>
      </nav>

      <main>
        <h1>{user.firstname}'s Todos</h1>
        <ul className="todo-list">
          {todos && todos.map((todo, index) => {
            return (
            <li key={`todo-${index}`}>
              <input 
                type="checkbox" 
                id={`todo-${index}`}
                checked={todo.isCompleted}
                onChange={() => toggleTodoCompleted(todo.task)} 
                />
              <label htmlFor={`todo-${index}`}>{todo.task}</label>
              <button onClick={() => deleteTodo(todo.task)} className="icon-center-button">
                <svg fill="var(--text-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
              </button>
              </li>
            )})
          }
        </ul>
        <footer>
          <button onClick={() => setShowModal(true)} className="main-button add-todo-button">Add Todo</button>
        </footer>

        <div className={`overlay ${showModal && "active"}`}>
          <div className={`create-todo-modal ${showModal && "active"}`}>
            <h2>Create New Todo</h2>
            <input 
              value={newTask}
              onKeyDown={handleKeyDown} 
              onChange={handleNewTaskInput} 
              type="text" 
              placeholder="Enter your task and press ENTER" 
              maxLength={40} />
            <button onClick={() => setShowModal(false)} className="icon-center-button close-x-button">
              <svg fill="var(--text-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}