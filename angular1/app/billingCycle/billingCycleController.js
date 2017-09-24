(function() {
  angular.module('primeiraApp').controller('BillingCycleCtrl',[
    '$http',
    '$location',
    'msgs',
    'tabs',
    BillingCycleController
  ])

  function BillingCycleController($http,$location,msgs,tabs) {
    const vm = this
    const url = 'http://localhost:3003/api/billingCycles'

    vm.refresh = function(){ // funcao que atualiza a lista com a resposta do servidor
      const page = parseInt($location.search().page) || 1
      $http.get(`${url}?skip=${(page - 1) * 10}&limit=10`).then(function(response){//pesquisa pelo noderestful para limitar em 10 e pular os n*10 registros
        vm.billingCycle = {credits: [{}],debts: [{}]}
        vm.billingCycles = response.data
        vm.calculateValues()

        $http.get(`${url}/count`).then(function(response) {
          vm.pages = Math.ceil(response.data.value /10)
          tabs.show(vm,{tabList: true, tabCreate: true})

        })
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
      vm.calculateValues()
      tabs.show(vm,{tabUpdate:true})
    }

    vm.showTabDelete = function(billingCycle) { // funcao que deixa disponivel a tab tabUpdate
      vm.billingCycle = billingCycle
      vm.calculateValues()
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
      vm.calculateValues()
    }

    vm.cloneCredit = function (index,{name, value}) {
      vm.billingCycle.credits.splice(index + 1, 0, {name,value})
      vm.calculateValues()
    }

    vm.deleteCredit = function(index) {
      if(vm.billingCycle.credits.length > 1){
        vm.billingCycle.credits.splice(index,1)
        vm.calculateValues()
      }
    }

    vm.addDebt = function(index) {
      vm.billingCycle.debts.splice(index + 1, 0, {})
      vm.calculateValues()
    }

    vm.cloneDebt = function(index,{name,value}) {
      vm.billingCycle.debts.splice(index + 1, 0, {name,value})
      vm.calculateValues()
    }

    vm.deleteDebt = function(index) {
      if(vm.billingCycle.debts.length > 1){
        vm.billingCycle.debts.splice(index,1)
        vm.calculateValues()
      }
    }

    vm.calculateValues = function() {
      vm.credit = 0
      vm.debt = 0

      if(vm.billingCycle){
        vm.billingCycle.credits.forEach(function({value}) {
          vm.credit += !value || isNaN(value) ? 0 : parseFloat(value) //caso value exista e for um numero faz-se um parse e soma a credit senao passa 0
        })

        vm.billingCycle.debts.forEach(function({value}) {
          vm.debt += !value || isNaN(value) ? 0 : parseFloat(value)
        })
      }
      vm.total = vm.credit - vm.debt
    }

    vm.refresh() //toda vez que for chamada a funcao principal,acaba com um refresh da lista
  }
})()
