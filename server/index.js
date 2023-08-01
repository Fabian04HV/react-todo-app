const express = require('express')
const dataBaseConnection = require("./db/index")
const { isAuthenticated, handleJWTError } = require('./middlewares/jwt.middlewares')
const app = express()
const port = 5000

const FRONTEND_URL = process.env.ORIGIN

const cors = require("cors")
const corsOptions = {
  origin: FRONTEND_URL, // Only allow requests from react frontend 
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


app.listen(port, '0.0.0.0', () => {
  console.log("-------------------- Server is listening on port ", port, " --------------------")
})