const { expressjwt: jwt } = require("express-jwt")
 
// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: 'payload', 
  getToken: getTokenFromHeaders
})
 
 
// Function used to extracts the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders (req) {
  // Check if the token is available on the request Headers
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
 
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1]
    return token
  } 
  return null
}
 
// Custom error handling middleware to catch JWT-related errors
function handleJWTError(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    // Redirect the user to the login page when the JWT is expired or invalid
    res.redirect('/login')
  } else {
    // For other errors, continue with the standard error handling
    next(err)
  }
}

// Export the middlewares so that we can use them to create protected routes
module.exports = {
  isAuthenticated,
  handleJWTError,
}