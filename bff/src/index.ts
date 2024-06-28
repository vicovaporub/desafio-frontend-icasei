import express from 'express'
import path from 'path'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  console.log('Request recieved')
  res.sendFile(path.join(__dirname, 'templates', 'index.html'))
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

