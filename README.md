# [work in progress] dummy-rest-vt-server
An express server for providing vector tiles via "ArcGIS Vector Tile Service"

## how to use
```sh
$ git clone git@github.com:hfu/dummy-rest-vt-server.git
$ cd dummy-rest-vt-server
$ openssl genrsa -des3 -passout pass:tile-block -out private.key 2048
$ openssl rsa -in private.key -pubout -out public.key -passin pass:tile-block
$ openssl req -new -key private.key -out server.csr
$ openssl x509 -req -days 365 -signkey private.key < server.csr > server.crt
$ npm install
$ node server
$ open https://localhost:68000/arcgis/rest/services/Hosted/openmaptiles/VectorTileServer?f=json
```

## CONTRIBUTE.md things
forks, issues, pull requests are welcome!
