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
  const VIDEOS_URL = process.env.VIDEOS_URL || ''
  const DRAWER_URL = process.env.DRAWER_URL || ''
  const VIDEOS_URL_PARAM = `${VIDEOS_URL}${param}`
  const DRAWER_URL_PARAM = `${DRAWER_URL}${param}`
  const template = fs.readFileSync(path.join(__dirname, 'templates', 'index.html'), 'utf8')

  const finalTemplate = template.replace(/{{VIDEOS_URL}}/g, VIDEOS_URL_PARAM)
  .replace(/{{DRAWER_URL}}/g, DRAWER_URL_PARAM)

  return finalTemplate
} 

app.get('/videos', (req: Request, res: Response) => {
  console.log(`entrou no videos`)
  res.send(templateBuilder('?mode=videos'));
});

app.get('/favs', (req: Request, res: Response) => {
  console.log(`entrou no favs`)
  res.send(templateBuilder('?mode=favs'));
});

app.get('/', (req: Request, res: Response) => {
  console.log('Request recieved')
  res.send(templateBuilder('?mode=videos'))
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

interface FavoriteVideos {
  id: string,
  title: string,
  channel: string,
  thumbnail: string

}


let favoriteVideos: FavoriteVideos[] = [];


app.post('/storage/favorites', (req, res) => {
  const { id, title, channel, thumbnail } = req.body;

  if (!id || !title || !channel || !thumbnail) {
      return res.status(400).json({ error: 'Missing or invalid video information' });
  }

  const existingIndex = favoriteVideos.findIndex(video => video.id === id);

  if (existingIndex !== -1) {
      favoriteVideos.splice(existingIndex, 1);
      console.log(`Video removed from favorites: ${title}`);

      return res.json({ isFavorite: false, video: { id, title, channel, thumbnail } });
  } else {
      favoriteVideos.push({ id, title, channel, thumbnail });
      console.log(`Video added to favorites: ${title}`);

      return res.json({ isFavorite: true, video: { id, title, channel, thumbnail } });
  }

});


app.get('/storage/favorites/:videoId', (req, res) => {
  const videoId = req.params.videoId;

  const isFavorite = favoriteVideos.some(video => video.id === videoId);

  res.json({ isFavorite });
});

app.get('/storage/favorites', (req, res) => {
    res.send(favoriteVideos);
})

 
app.listen(port, () => {
  console.log(`APP listening at http://localhost:${port}`)
})

