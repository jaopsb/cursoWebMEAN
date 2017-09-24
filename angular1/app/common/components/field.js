(function() {
  angular.module('primeiraApp').component('field',{
    bindings:{
      id:'@',
      label:'@',
      grid:'@',
      placeholder:'@',
      type:'@',
      model: '=',
      readonly:'<',
    },
    controller:[
      'gridSystem',
      function(gridSystem){
        this.$onInit = function() {
            this.gridClasses = gridSystem.toCssClasses(this.grid)
        }
      }
    ],
    template:`
    <div class="{{$ctrl.gridClasses}}">
      <div class="form-group">
        <label for="{{$ctr.id}}">{{$ctrl.label}}</label>
        <input id="{{$ctrl.id}}" class="form-control" placeholder="{{$ctr.placeholder}}"
          type="{{$ctrl.type}}" ng-model="$ctrl.model" ng-readonly="$ctrl.readonly"></input>
      </div>
    </div>
    `
  })
})()
