const express = require("express")
const router = express.Router()

const {
    login,
    register
} = require("../controllers/user.controller")

// Login
// POST
router.route("/login").post(login)

// Register
// POST
router.route("/register").post(register)

module.exports = router