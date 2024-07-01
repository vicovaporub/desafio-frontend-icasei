import express, { Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import axios from 'axios'
import cors from 'cors'

dotenv.config()

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use(express.static('public'))

const templateBuilder = (param: string = '') => {
  const VIDEOS_URL = process.env.VIDEO_URL || ''
  const DRAWER_URL = process.env.DRAWER_URL || ''
  const VIDEOS_URL_PARAM = `${VIDEOS_URL}${param}`
  const DRAWER_URL_PARAM = `${DRAWER_URL}${param}`
  const template = fs.readFileSync(path.join(__dirname, 'templates', 'index.html'), 'utf8')

  const finalTemplate = template.replace(/{{VIDEOS_URL}}/g, VIDEOS_URL_PARAM)
  .replace(/{{DRAWER_URL}}/g, DRAWER_URL_PARAM)

  return finalTemplate
}

app.get('/videos', (req, res) => {
  console.log(`entrou no videos`)
  res.send(templateBuilder('?mode=videos'));
});

app.get('/favs', (req, res) => {
  console.log(`entrou no favs`)
  res.send(templateBuilder('?mode=favs'));
});

app.get('/', (req: Request, res: Response) => {
  console.log('Request recieved')
  res.send(templateBuilder())
})

app.post('/api/getVideos', async (req: Request, res: Response) => {
   const mockJson = fs.readFileSync(path.join(__dirname, '', 'mock.json'), 'utf8')
   res.send(mockJson) //TODO tirar isso aqui caralha

  // console.log(`Request recieved: ${req.body}`)
  // const  query  = req.body.text; 
  // console.log('query:', query);
  // const YT_API_KEY = process.env.YT_API_KEY
  // const YT_API_URL = process.env.YT_API_URL
  // const part = 'snippet'
  // const type = 'video'
  // const maxResults = 10

  // const searchParamsString = `?q=${query}&key=${YT_API_KEY}&part=${part}&type=${type}&maxResults=${maxResults}`
  // console.log(`${YT_API_URL}${searchParamsString}`)

  // try {
  //   const response = await axios.get(`${YT_API_URL}${searchParamsString}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Referer': process.env.YT_API_REFERER
  //     }
  //   })

  //   const videos = response.data.items
  //   console.log(videos)
  //   res.send(videos)

  // } catch (error) {
  //   console.log('Error:', error)
  // }
  
});

  

 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

