import axios from "axios"

export const fetchUsersTodos = (userId) => {
  const authToken = localStorage.getItem("authToken")
  return axios.get(`${process.env.REACT_APP_API_URL}/api/${userId}/todos`, { headers: { Authorization: `Bearer ${authToken}` }})
  .then(response => {
    return response.data.todos
  })
}

// const createTodo = () => {
//   axios.post(`${process.env.REACT_APP_API_URL}/api/create-todo`, { task: newTask }, { headers: { Authorization: `Bearer ${authToken}`}})
//   .then(response => {
//     const todo = {
//       _id: response.data.todo._id,
//       task: response.data.todo.task
//     }

//     setTodos(prev => [...prev, todo])
//     setNewTask('')
//   })
//   .catch(err => console.log(err))
// }

// const deleteTodo = (todoId) => {
//   axios.delete(`${process.env.REACT_APP_API_URL}/api/delete-todo-${todoId}`, { headers: { Authorization: `Bearer ${authToken}`}})
//   .then((response) => {
//     console.log("DELETED: ", response.data.deletedTodo)
//   })
//   .catch(err => console.log(err))
//   .finally(() => {
//     const updatedTodos = todos.filter(todo => todo._id !== todoId);
//     setTodos(updatedTodos)
//   }) 
// }