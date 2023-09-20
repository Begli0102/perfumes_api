 const jwt = require("jsonwebtoken");


 // Generate JWT
 const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_PASS, {
    expiresIn: "30d",
  });
};
module.exports = generateToken;