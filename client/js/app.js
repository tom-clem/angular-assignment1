
angular.module('SearchApp', [
  'RepsAppControllers'
]);

angular
  .module('RepsAppControllers', [
    'repsService'
  ])
  .controller('MainCtrl', function (reps) {
    var main2 = this;
    main2.reps = [];

    main2.searchByZip = function (zip) {
      reps.allByZip(zip).then(function (data) {
        main2.reps = data;
      });
    };

    main2.searchRepsByName = function (name) {
      reps.repsByName(name).then(function (data) {
        main2.reps = data;
      });
    };

    main2.searchRepsByState = function (state) {
      reps.repsByState(state).then(function (data) {
        main2.reps = data;
      });
    };
  });

angular
  .module('repsService', [])
  .factory('reps', function ($http) {
    var host = 'http://dgm-representatives.herokuapp.com';
    return {
      allByZip: function (zip) {
        return $http
          .get(host + '/all/by-zip/' + zip)
          .then(function (response) {
            return response.data;
          });
      },
      repsByName: function (name) {
        return $http
          .get(host + '/reps/by-name/' + name)
          .then(function (response) {
            return response.data;
          });
      },
      repsByState: function (state) {
        return $http
          .get(host + '/reps/by-state/' + state)
          .then(function (response) {
            return response.data;
          });
    }};
  });
