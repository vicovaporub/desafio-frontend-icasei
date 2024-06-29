import express from 'express'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import axios from 'axios'
import cors from 'cors'

dotenv.config()

const app = express()
const port = 3000

app.use(cors())

const templateBuilder = (param: string = '') => {
  const DRAWER_URL = process.env.DRAWER_URL || ''
  const VIDEOS_URL = process.env.VIDEO_URL || ''
  //const VIDEOS_URL_WITH_PARAM = `${VIDEOS_URL}${param}`
  const template = fs.readFileSync(path.join(__dirname, 'templates', 'index.html'), 'utf8')

  const finalTemplate = template.replace(/{{VIDEOS_URL}}/g, VIDEOS_URL)
  .replace(/{{DRAWER_URL}}/g, DRAWER_URL)

  return finalTemplate
  
}

app.get('/', (req, res) => {
  console.log('Request recieved')
  res.send(templateBuilder())
})

app.get('/api/test', (req, res) => {
  const content = `<h1>Test</h1>`
  res.send(content)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

