const express = require('express')
const dataBaseConnection = require("./db/index")
const { isAuthenticated, handleJWTError } = require('./middlewares/jwt.middlewares')
const app = express()
const port = 5000

const cors = require("cors")
const corsOptions = {
  origin: 'http://localhost:3000', // Only allow requests from react frontend 
}

app.use(cors(corsOptions))

const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const indexRoutes = require("./routes/index.routes")
app.use("/api", indexRoutes)

const authRoutes = require("./routes/auth.routes")
app.use("/auth", authRoutes)

const todoRoutes = require("./routes/todo.routes")
app.use("/api", isAuthenticated, todoRoutes)

app.use(handleJWTError)


app.listen(port, () => {
  console.log("-------------------- Server is listening on port ", port, " --------------------")
})