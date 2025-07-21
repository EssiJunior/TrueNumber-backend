//  =============================== Imports ===============================
// Node modules
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config();
// API routers import
const authRouter = require("./api/auth")
    // Swagger UI
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require("./utils/swagger_ui")
    //  =============================== ======== ===============================

const PORT = process.env.PORT || 4000


const app = express()
app.listen(PORT, () => {
    console.log(`[INFO]: Server running on port ${PORT}!`)
})

app.use(cors({
    origin: ["http://localhost:3000" ],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
}));
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connection to database
mongoose
    .connect(`mongodb+srv://trueNumber:1FOjAhDfsa8Vjvm6@cluster0.wrwyzyr.mongodb.net/TrueNumber`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("[INFO]: Database connected!")
    }).catch(err => {
        console.log("[ERROR]: ", err.message)
    })

/**
 * @openapi
 * /:
 *  get:
 *      summary: Welcome message
 *      description: Server is documented!
 *      responses:
 *          200:
 *              description: To test get method.
 */

// Endpoints
app.get('/', (req, res) => {
    res.send('Welcome to TureNumber API server!')
})

app.use("/api", authRouter)