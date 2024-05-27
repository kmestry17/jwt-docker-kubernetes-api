const jwt = require("jsonwebtoken");

const secretKey = "hey$EV75&6$)asd456rg><#$re345RT5";

// Example signing with a payload (optional)
const payload = {
  userId: 123,
  username: "john.doe",
};

const token = jwt.sign(payload, secretKey, { expiresIn: "1h" }); // Set expiration time (optional)

console.log(token);
