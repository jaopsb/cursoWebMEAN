const _ = require('lodash')
const BillingCycle = require('../billingCycle/billingCycle')

//middleware
function getSummary(req,res){
  BillingCycle.aggregate({//fluxo de agregacao
    $project: {credit: {$sum:"$credits.value"},debt: {$sum:"$debts.value"}} // somatorio de todos os valores creditos e dos debitos, agregacao do mongodb
  },{
    $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum:"$debt"}}
  },{
    $project: {_id: 0, credit: 1, debt: 1}//pega apenas o credit e debt, tirando o id, pois nao precisamos dele na agregacao
  },function (error,result) {
    if(error){
      res.status(500).json({errors:[error]})
    }else{
      res.json(_.defaults(result[0],{credit: 0, debt: 0}))//devolve o que foi encontrado, ou se nao tiver os atributos default, eh envado como 0
    }
  })
}

module.exports = { getSummary } //notacao nova, objeto q tem o nome getSummary e possui a funcao getSummary
