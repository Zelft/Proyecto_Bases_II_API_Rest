import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import specialRoutes from './routes/special.routes'

// Initializations
const app = express()
// Settings
app.set('port', process.env.PORT || 30001)

// API Middlewares
app.use(morgan('dev')) // Popular HTTP request middleware logger for Node. js, basically used as a logger
app.use(cors()) // Uses additional HTTP headers allow access to selected routes from a different origin.
app.use(express.urlencoded({extended: false})) // Only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(express.json()) // Express middleware that only parses json 

// routes
app.get('/', (req, res) => {
    res.send(`THE API is at http://localhost:${app.get('port')}`)
})

app.use(authRoutes)
app.use(specialRoutes)

export default app