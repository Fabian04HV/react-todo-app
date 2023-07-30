import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/auth.context"
import { ThemeContext } from "../context/theme.context"
import "../styles/Home.css"
import { fetchUsersTodos, saveTodos } from "../utils/todo.utils"

export const Home = () => {
  const { toggleDarkmodeHandler } = useContext(ThemeContext)
  const { user, logoutUser } = useContext(AuthContext)
  const authToken = localStorage.getItem('authToken')

  const [showOverlay, setShowOverlay] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const [todos, setTodos] = useState([])
  const [newTask, setNewTask] = useState('')
  const [newEditTask, setNewEditTask] = useState('')
  const [editTask, setEditTask] = useState('')

  const [fetchCompleted, setFetchCompleted] = useState(false)

  useEffect(() => {
    fetchUsersTodos(user._id, authToken)
      .then(response => {
        setTodos(response)
        setFetchCompleted(true)
      })
  }, [])

  useEffect(() => {
    if(fetchCompleted) saveTodos(todos, authToken)
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

  const handleEditKeyDown = (e) => e.key === "Enter" && confirmChange() 
  const handleNewEditTaskInput = (e) => setNewEditTask(e.target.value)

  const editTodo = (task) => {
    setShowOverlay(true)
    setShowEditModal(true)
    setNewEditTask(task)
    setEditTask(task)
  }

  const confirmChange = () => {
    const updatedTodos = todos.map(todo => {
      if(todo.task === editTask){
        return { ...todo, task: newEditTask}
      }
      else return todo
    })
    setTodos(updatedTodos)
  }

  const closeModals = () => {
    setShowEditModal(false)
    setShowCreateModal(false)
    setShowOverlay(false)
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
        <button onClick={() => toggleDarkmodeHandler()} className="icon-center-button white-hover" title="Switch Theme">
          <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28"><path d="M524-40q-84 0-157.5-32t-128-86.5Q184-213 152-286.5T120-444q0-146 93-257.5T450-840q-18 98 11 192.635 29 94.635 100 165.736 71 71.101 165.5 100.143Q821-352.445 920-370.471q-26 144.206-138 237.338Q670-40 524-40Zm0-60q100 0 182-57t132-145q-90-8-173-41.5T518.5-440Q455-503 422-585.5T381-757q-88 48-144.5 130.5T180-444q0 143.333 100.333 243.667Q380.667-100 524-100Zm-6-340Z"/></svg>
        </button>
        <span>{user.firstname} {user.lastname}</span>
        <button title="Logout" className="white-hover" onClick={() => logoutUser()}>
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
              <button onClick={() => editTodo(todo.task)} title="Edit" className="icon-center-button">
                <svg fill="var(--text-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>
              </button>
              <button onClick={() => deleteTodo(todo.task)} className="icon-center-button">
                <svg fill="var(--text-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
              </button>
              </li>
            )})
          }
        </ul>
        <footer>
          <button title="Create New Todo" onClick={() => { setShowOverlay(true); setShowCreateModal(true)}} className="main-button add-todo-button">Add Todo</button>
        </footer>
        {showOverlay && 
        <div className={`overlay`}>
          ${showCreateModal && 
          <div className={`create-todo-modal`}>
            <h2>Create New Todo</h2>
            <input 
              value={newTask}
              onKeyDown={handleKeyDown} 
              onChange={handleNewTaskInput} 
              type="text" 
              placeholder="Enter your task and press ENTER" 
              maxLength={80} />
            <button title="close" onClick={() => closeModals()} className="icon-center-button close-x-button">
              <svg fill="var(--text-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
            </button>
          </div>}
          ${showEditModal && 
          <div className={`create-todo-modal`}>
            <h2>Edit Todo</h2>
            <input 
              value={newEditTask}
              onKeyDown={handleEditKeyDown} 
              onChange={handleNewEditTaskInput} 
              type="text" 
              placeholder="Enter your task and press ENTER" 
              maxLength={80} />
            <button title="close" onClick={() => closeModals()} className="icon-center-button close-x-button">
              <svg fill="var(--text-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
            </button>
            <button className="main-button" title="Confirm Change" onClick={() => confirmChange()}>Confirm Change</button>
          </div>}

        </div>
        }
        
      </main>
    </div>
  )
}