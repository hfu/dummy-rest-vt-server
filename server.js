const spdy = require('spdy')
const express = require('express')
const fs = require('fs')

const app = express()
const style = fs.readFileSync('style.json')

app.get(
  '/arcgis/rest/services/Hosted/openmaptiles/VectorTileServer', 
  (req, res, next) => {
  res.set('Content-Type', 'application/json').send({
    currentVersion: 10.4,
    name: 'openmaptiles',
    capabilities: 'TilesOnly',
    type: 'vector',
    defaultStyles: 'resources/styles',
    tiles: ['https://hfujimura.gitlab.io/caf1801/{z}/{x}/{y}.mvt'],
    exportTilesAllowed: true,
    maxExportTilesCount: 10000,
    resourceInfo: {
      styleVersion: 8
    }
  })
})

app.get(
  '/arcgis/rest/services/Hosted/openmaptiles/VectorTileServer/resources/styles/root.json',
  (req, res, next) => {
  res.set('Content-Type', 'application/json').send(style)
})

spdy.createServer({
  key: fs.readFileSync('private.key'),
  cert: fs.readFileSync('server.crt'),
  passphrase: 'tile-block'
}, app).listen(65432, () => {})

