angular.module('myApp').controller('mainController', function($scope, sockets){
  $scope.socketState = {};
  sockets.on('open', function open() {
    $scope.$apply(function(){$scope.socketState.online = true;})
  })

});