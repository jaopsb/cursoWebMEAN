(function() {
  angular.module('primeiraApp').controller('BillingCycleCtrl',[
    '$http',
    'msgs',
    'tabs',
    BillingCycleController
  ])

  function BillingCycleController($http,msgs,tabs) {
    const vm = this
    const url = 'http://localhost:3003/api/billingCycles'

    vm.refresh = function(){ // funcao que atualiza a lista com a resposta do servidor
      $http.get(url).then(function(response){
        vm.billingCycle = {credits: [{}],debts: [{}]}
        vm.billingCycles = response.data
        tabs.show(vm,{tabList: true, tabCreate: true})
      })
    }

    vm.create = function() { // funcao que gera um request de post para o servidor
      $http.post(url, vm.billingCycle).then(function(response){
        vm.refresh()
        msgs.addSuccess("Operação realizada com sucesso!")
      }).catch(function(response){
        msgs.addError(response.data.errors)
      })
    }

    vm.showTabUpdate = function(billingCycle) { // funcao que deixa disponivel a tab tabUpdate
      vm.billingCycle = billingCycle
      tabs.show(vm,{tabUpdate:true})
    }

    vm.showTabDelete = function(billingCycle) { // funcao que deixa disponivel a tab tabUpdate
      vm.billingCycle = billingCycle
      tabs.show(vm,{tabDelete:true})
    }

    vm.update = function() { //funcao que atualiza um registro ja feito e envia para o servidor
      const urlUpdate = `${url}/${vm.billingCycle._id}`
      $http.put(urlUpdate,vm.billingCycle).then(function(response) {
        vm.refresh()
        msgs.addSuccess("Operação realizada com sucesso!")
      }).catch(function(response) {
        msgs.addError(response.data.errors)
      })
    }

    vm.delete = function() { //funcao que faz um request do tipo delete de um registro no servidor
      const urlDelete = `${url}/${vm.billingCycle._id}`
      $http.delete(urlDelete,vm.billingCycle).then(function(response) {
        vm.refresh()
        msgs.addSuccess('Operação realizada com sucesso')
      }).catch(function(reponse) {
        msgs.addError(response.data.errors)
      })
    }

    vm.addCredit = function (index) {
      vm.billingCycle.credits.splice(index + 1, 0, {})
    }

    vm.cloneCredit = function (index,{name, value}) {
      vm.billingCycle.credits.splice(index + 1, 0, {name,value})
    }

    vm.deleteCredit = function(index) {
      if(vm.billingCycle.credits.length > 1){
        vm.billingCycle.credits.splice(index,1)
      }
    }

    vm.addDebt = function(index) {
      vm.billingCycle.debts.splice(index + 1, 0, {})
    }

    vm.cloneDebt = function(index,{name,value}) {
      vm.billingCycle.debts.splice(index + 1, 0, {name,value})
    }

    vm.deleteDebt = function(index) {
      if(vm.billingCycle.debts.length > 1){
        vm.billingCycle.debts.splice(index,1)
      }
    }

    vm.refresh() //toda vez que for chamada a funcao principal,acaba com um refresh da lista
  }
})()
