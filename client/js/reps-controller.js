angular
  .module('RepsApp')
  .controller('RepsController', ['$http', function ($http) { // Make sure to add this $http service
    var self = this;
    self.members = [];

    // This is a method we'll call to update the members data
    self.searchByZip = function (zip) {
      $http
        .get('http://dgm-representatives.herokuapp.com/all/by-zip/' + zip)
        .then(function (res) {
          self.members = res.data;
        });
    };

    self.searchByName = function (name) {
      $http
        .get('http://dgm-representatives.herokuapp.com/reps/by-name/' + name)
        .then(function (res) {
          self.members = res.data;
        });
    };

    self.searchByState = function (state) {
      $http
        .get('http://dgm-representatives.herokuapp.com/reps/by-state/' + state)
        .then(function (res) {
          self.members = res.data;
        });
    };






  }]);
