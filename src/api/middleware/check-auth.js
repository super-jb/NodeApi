// https://jwt.io/
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // auth example -> we only want the actual token, not 'Bearer' 
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwidXNlcklkIjoiNWQzOTM2NjExNWZiMzczZTUwZjhmMTBiIiwiaWF0IjoxNTY0MDY1MTY3LCJleHAiOjE1NjQwNjg3Njd9.fOcNlJ1cWybMnUSxJUWcCeBTl4A70Co_U0h8WI4uaso
    const token = req.headers.authorization;
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
    req.userData = decoded;
    next();
  }
  catch(error) {
    return res.status(401).json({
      message: 'Authentication failed'
    });
  }
};