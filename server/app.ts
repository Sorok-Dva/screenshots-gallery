import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import 'reflect-metadata'
import cors from 'cors'
import router from './router'
import { notFoundHandler } from './middlewares'
import { dbCreateConnection } from './orm';

dotenv.config()


const app = express()
app.set('port', process.env.PORT || 3000)
app.set('env', process.env.NODE_ENV)
app.set('trust proxy', true)

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}))
// @ts-ignore
app.use(bodyParser.json({ limit: '150mb' }))
// @ts-ignore
app.use(bodyParser.urlencoded({ extended: true, limit: '15mb' }))

app.use('/', router)

// app.use(genericErrorHandler)
app.use(notFoundHandler)

app.listen(app.get('port'), async () => {
  console.log(
    '\x1b[32m\x1b[7m ✓ Server is running at http://localhost:%d in %s mode\x1b[0m',
    app.get('port'),
    app.get('env'),
  )
  console.log('Press \x1b[31m\x1b[7mCTRL-C\x1b[0m to stop\\n')
  await dbCreateConnection()
})

export default app