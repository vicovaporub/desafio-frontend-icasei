import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { appGetVideos,
  appGetFavs,
  appGetHome,
  postApiGetVideos,
  postStorageFavorites,
  getStorageFavoritesVideoId,
  getStorageFavorites,
  listen
 } from './serverRoutes'

dotenv.config()

export const app = express()
const port = 3000 

app.use(cors())
app.use(express.json()) 

app.use(express.static('public'))

app.get('/videos', appGetVideos);

app.get('/favs', appGetFavs);

app.get('/', appGetHome)

app.post('/api/getVideos', postApiGetVideos)

app.post('/storage/favorites', postStorageFavorites)

app.get('/storage/favorites/:videoId', getStorageFavoritesVideoId)

app.get('/storage/favorites', getStorageFavorites)

app.listen(port, listen)

