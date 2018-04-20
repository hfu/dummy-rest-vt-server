const spdy = require('spdy')
const express = require('express')
const cors = require('cors')
const fs = require('fs')

const app = express()
const style = fs.readFileSync('bright.json')

app.use(cors())

app.get(
  '/arcgis/rest/services/Hosted/openmaptiles/VectorTileServer', 
  (req, res, next) => {
  res.set('Content-Type', 'application/json').send({
    currentVersion: 10.4,
    name: 'openmaptiles vector tile service',
    capabilities: 'TilesOnly',
    type: 'indexedVector',
    tileMap: 'tilemap',
    defaultStyles: 'resources/styles',
    tiles: ['https://example.com/zxy/somewhere/{z}/{x}/{y}'],
    exportTilesAllowed: true,
    maxExportTilesCount: 10000,
    initialExtent: {
      xmin: -20037507.842788246,
      ymin: -20037508.342787,
      xmax: 20037507.842788246,
      ymax: 20037508.342787,
      spatialReference: {wkid: 102100, latestWkid: 3857}
    },
    fullExtent: {
      xmin: -20037507.842788246,
      ymin: -20037508.342787,
      xmax: 20037507.842788246,
      ymax: 20037508.342787,
      spatialReference: {wkid: 102100, latestWkid: 3857}
    },
    minScale: 295828763.7957775,
    maxScale: 564.248588,
    tileInfo: {
      rows: 512, cols: 512, dpi: 96, format: 'pbf',
      origin: {x: -20037508.342787, y: 20037508.342787},
      spatialReference: {wkid: 102100, latestWkid: 3857},
      lods: [
        {level: 0, resolution: 78271.516964, scale: 295828763.7957775},
        {level: 1, resolution: 39135.75848199995, scale: 147914381.8978885},
        {level: 2, resolution: 19567.87924100005, scale: 73957190.9489445},
        {level: 3, resolution: 9783.93962049995, scale: 36978595.474472},
        {level: 4, resolution: 4891.96981024998, scale: 18489297.737236},
        {level: 5, resolution: 2445.98490512499, scale: 9244648.868618},
        {level: 6, resolution: 1222.992452562495, scale: 4622324.434309},
        {level: 7, resolution: 611.496226281245, scale: 2311162.2171545},
        {level: 8, resolution: 305.74811314069, scale: 1155581.1085775},
        {level: 9, resolution: 152.874056570279, scale: 577790.5542885},
        {level: 10, resolution: 76.4370282852055, scale: 288895.2771445},
        {level: 11, resolution: 38.2185141425366, scale: 144447.638572},
        {level: 12, resolution: 19.1092570712683, scale: 72223.819286},
        {level: 13, resolution: 9.55462853563415, scale: 36111.909643},
        {level: 14, resolution: 4.777314267817075, scale: 18055.9548215},
        {level: 15, resolution: 2.388657133974685, scale: 9027.977411},
        {level: 16, resolution: 1.19432856698734, scale: 4513.9887055},
        {level: 17, resolution: 0.597164283427525, scale: 2256.9943525},
        {level: 18, resolution: 0.2985821417799085, scale: 1128.4971765},
        {level: 19, resolution: 0.1492910708238085, scale: 564.248588}
      ]
    },
    resourceInfo: {
      styleVersion: 8, tileCompression: 'gzip',
      cacheInfo: {
        storageInfo: {
          packetSize: 128, storageFormat: "compactV2"
        }
      }
    }
  })
})

app.get(
  '/arcgis/rest/services/Hosted/openmaptiles/VectorTileServer/resources/styles/root.json',
  (req, res, next) => {
  res.set('Content-Type', 'application/json').send(style)
})

// app.listen(65432)

spdy.createServer({
  key: fs.readFileSync('private.key'),
  cert: fs.readFileSync('server.crt'),
  passphrase: 'tile-block'
}, app).listen(65432, () => {})
