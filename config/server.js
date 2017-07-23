const port       = 3003
const bodyParser = require('body-parser')
const express    = require('express')
const server     = express()

server.use(bodyParser.urlencoded({ extended:true })) //receber uma url com dados mais extendida do que a padrao
server.use(bodyParser.json()) //receber tudo que for json diretamente no formato padrao json

server.listen(port,function () {
  console.log(`BACKEND is running on port ${port}.`);
})

//module.exports eh igual a return nesse caso
module.exports = server //exportando o servidor para ser recebido em routes.js
