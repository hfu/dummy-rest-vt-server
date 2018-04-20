const spdy = require('spdy')
const express = require('express')
const fs = require('fs')

const app = express()

app.get(
  '/arcgis/rest/services/Hosted/openmaptiles/VectorTileServer', 
  (req, res, next) => {
  res.send({hello: 'world'})
})

app.get(
  '/arcgis/rest/services/Hosted/openmaptiles/VectorTileServer/resources/styles/root.json',
  (req, res, next) => {
  res.send({hello: 'world'})
})

spdy.createServer({
  key: fs.readFileSync('private.key'),
  cert: fs.readFileSync('server.crt'),
  passphrase: 'tile-block'
}, app).listen(65432, () => {})

