const BillingCycle = require('./billingCycle')
const _            = require('lodash')

BillingCycle.methods(['get','post','put','delete'])
BillingCycle.updateOptions({new:true, runValidators:true}) // retorna o objeto novo e nao o que ja estava na base de dados antes da alteracao

BillingCycle.after('post',sendErrorOrNext).after('put',sendErrorOrNext)

function sendErrorOrNext(req,res,next) { //funcao que valida que tipo de mensagem esta sendo enviado de volta depois do put ou post do noderestful
  const bundle = res.locals.bundle

  if(bundle.errors){
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
  }else{
    next()
  }
}

function parseErrors(nodeRestfulErrors) {
  const errors = []

  _.forIn(nodeRestfulErrors,error => errors.push(error.message)) //pesquisa dentro do obj error e envia para o array a mensagem que veio
  return errors
}

BillingCycle.route('count',function (req,res,next) { // rota para receber o valor d quantidade de registros no banco
  BillingCycle.count(function (error,value) {
    if(error){
      res.status(500).json({errors:[error]}) //define o tipo de objeto que sera enviado
    }else{
      res.json({value})
    }

  })
})

module.exports = BillingCycle
