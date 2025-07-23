import 'dotenv/config'
import express from 'express'
import { clerkClient, requireAuth, getAuth } from '@clerk/express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(clerkMiddleware())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

