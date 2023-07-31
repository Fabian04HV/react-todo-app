const express = require('express')
const router = express.Router()
const User = require('../models/User.model')

router.get('/:userid/todos', (req, res) => {
  const userId = req.params.userid

  User.findById(userId)
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(404).json({ message: "User not found" })
      }
      res.status(200).json({ todos: foundUser.todos })
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" })
    })
})

router.put('/save-todos', (req, res) => {
  const { todos } = req.body
  User.findOneAndUpdate({ _id: req.payload._id}, { todos: todos })
  .then((updatedUser) => {
    res.status(200).json({ todos: updatedUser.todos })
  })
})

module.exports = router