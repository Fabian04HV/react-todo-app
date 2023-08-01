const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const User = require("../models/User.model")
const saltRounds = 5
const { isAuthenticated } = require("./../middlewares/jwt.middlewares")

router.post("/signup", (req, res) => {
  const { firstname, lastname, email, password } = req.body

  User.findOne({ email: email })
  .then(foundUser => {
    if(foundUser){
      return res.status(409).json({ message: "User with that email already exists"})
    }
    else{
      //Check for password security
      if (password.length <= 8) 
      return res.status(400).json({ message: "Password must be longer than 8 characters." })

      if (!/\d/.test(password))
      return res.status(400).json({ message: "Password must include at least one number." })

      if (!/[a-z]/.test(password))
      return res.status(400).json({ message: "Password must include at least one lowercase letter." })

      if (!/[A-Z]/.test(password))
      return res.status(400).json({ message: "Password must include at least one uppercase letter." })

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return res.status(400).json({ message: "Password must include a special character." })

      if (/\s/.test(password))
      return res.status(400).json({ message: "Password cannot contain spaces." })

      const salt = bcrypt.genSaltSync(saltRounds)
      const hashedPassword = bcrypt.hashSync(password, salt)

      User.create( { firstname, lastname, email, password: hashedPassword })
      .then(createdUser => {
        const { firstname, lastname, email } = createdUser
        const user = { firstname, lastname, email}
        res.status(201).json({ message: "User successfully created", user})
      })
    }
  })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  
  User.findOne({ email: email })
  .then(foundUser => {
    if(!foundUser) return res.status(404).json({ message: 'User not found' })
    else{
      const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password)

      if(isPasswordCorrect){
        const { _id, firstname, lastname, email} = foundUser

        const payload = { _id, firstname, lastname, email }
        const authToken = jwt.sign(payload, 
          process.env.TOKEN_SECRET, 
          { algorithm: 'HS256', expiresIn: "8h" })

        res.status(200).json({ authToken })
      }else {
        res.status(401).json({ message: 'Wrong Password' })
      }
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Internal Server Error' })
  })
})

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get('/verify', isAuthenticated, (req, res) => {
  res.status(200).json(req.payload)
})
module.exports = router