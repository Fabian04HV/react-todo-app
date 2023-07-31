import axios from "axios"

export const fetchUsersTodos = (userId, authToken) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/${userId}/todos`, { headers: { Authorization: `Bearer ${authToken}` }})
  .then(response => {
    return response.data.todos
  })
}

export const saveTodos = (todos, authToken) => {
  axios.put(`${process.env.REACT_APP_API_URL}/api/save-todos`, 
    { todos }, 
    { headers: { Authorization: `Bearer ${authToken}`}}
  )
  .catch(err => console.log(err))
}