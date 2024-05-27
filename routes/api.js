const express = require("express");

const router = express.Router();

// Example API endpoints (replace with your functionality)
router.get("/secure-data", (req, res) => {
  // Access user information from req.user (if present)
  const userData = req.user;
  console.log("User accessing secure data:", userData); // Log user information for debugging

  res.json({ message: "Welcome to the secure data!" });
});

module.exports = router;
