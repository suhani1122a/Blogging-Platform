const express = require("express")
const cors = require("cors")
const connectDB = require("./config/database")
const dotenv = require("dotenv").config()

const userRoutes = require("./routes/user.routes")
const errorHandler = require("./middleware/errorHandler.middleware")
const validateUser = require("./middleware/userValidator.middleware")

connectDB()

const app = express()
const port = process.env.PORT

// middlewares
app.use(errorHandler);
app.use(validateUser);
app.use(cors({
    origin: ['http://localhost:4200']
}));

// json parser
app.use(express.json())

// api route for user
app.use("/blogverse/user", userRoutes)



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})