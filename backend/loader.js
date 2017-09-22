const server = require('./config/server')
require('./config/database')
require('./config/routes')(server) //eh retornada uma funcao no routes.js
