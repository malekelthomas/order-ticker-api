import express from 'express'
import cors from 'cors'
import { client } from './square-client.js'
import { ApiError } from 'square'
import dotenv from 'dotenv'
import fs from 'fs'
import https from 'https'

const serverOptions = {
   key: fs.readFileSync('key.pem'),
   cert: fs.readFileSync('cert.pem'),
}

const app = express()


app.use(cors())
app.use(express.json())
let sq = client

dotenv.config()
let token: any
app.post('/', async (req: any, res: any) => {
   try {
      const result = sq.oAuthApi.obtainToken({
         clientId: process.env.REACT_APP_SQUARE_APP_ID!,
         clientSecret: process.env.REACT_APP_SQUARE_SECRET!,
         grantType: 'authorization_code',
         code: req.body.code,
      })
      token = (await result).body
      console.log(token)
      return res.json({ result: 'success' })
   } catch (err) {
      if (err instanceof ApiError) {
         const errors = err.result
         return res.json({ error: errors })
      }
   }
})

app.post('/orders', async (req: any, res: any) => {
   console.log(req.body)
})

const server = https.createServer(serverOptions, app)
const start = async () => {
   try {
      await server.listen(9000)
   } catch (err) {
      console.log(err)
      process.exit(1)
   }
}

start()
