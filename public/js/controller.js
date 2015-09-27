angular.module('myApp').controller('mainController', function($scope, sockets){
  $scope.tags = [
    { "id": 1, "name": "Tag1" },
    { "id": 2, "name": "Tag2" },
    { "id": 3, "name": "Tag3" },
    { "id": 4, "name": "Tag4" },
    { "id": 5, "name": "Tag5" },
    { "id": 6, "name": "Tag6" },
    { "id": 7, "name": "Tag7" },
    { "id": 8, "name": "Tag8" },
    { "id": 9, "name": "Tag9" },
    { "id": 10, "name": "Tag10" }
  ];

  $scope.socketEvents = [];
  $scope.chosenTags = [{ "id": 1, "name": "Tag1" },];

  $scope.loadTags = function(query) {
    return $scope.tags;
  };

  $scope.$watchCollection('chosenTags', function watcher(oldValue, newValue) {
    sockets.write({action: 'tags.new', data: $scope.chosenTags})
  });

  sockets.on('reconnect', function reconnect(opts) {
    $scope.socketEvents.push({name: 'reconnect', text: 'We are scheduling a new reconnect attempt. This is attempt '+ opts.attempt +' and will trigger a reconnect operation in '+ opts.scheduled +' ms.'});
  });

  sockets.on('open', function open() {
    $scope.socketEvents.push({name: 'open', text: 'The connection has been established.'});
  });

  sockets.on('data', function open(data) {
    if (data.action === 'tags.new.saved') {
      $scope.socketEvents.push({name: 'tags.new.saved', text: 'Your new tag array was saved with ids ' + data.tags.map(function(tag){
        return tag.id
      })});
    }
  });

});