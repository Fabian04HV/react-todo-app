const express = require("express")
const { isAuthenticated } = require("../middlewares/jwt.middlewares")
const router = express.Router()

router.get('/', isAuthenticated,(req, res) => {
  res.send('Hello World!')
})

module.exports = router