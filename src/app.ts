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
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send(`THE API is at http://localhost:${app.get('port')}`)
})

app.use(authRoutes)
app.use(specialRoutes)

export default app