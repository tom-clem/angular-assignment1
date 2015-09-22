
angular.module('SearchApp', [
  'SearchAppControllers'
]);

angular
  .module('SearchAppControllers', [
    'searchService'
  ])
  .controller('MainCtrl', function (variable) {
    var main2 = this;
    main2.variable = [];


    main2.searchByZip = function (zip) {
      variable.allByZip(zip).then(function (data) {
        main2.variable = data;
      });
    };

    main2.searchRepsByName = function (name) {
      variable.repsByName(name).then(function (data) {
        main2.variable = data;
      });
    };

    main2.searchSensByName = function (name) {
      variable.sensByName(name).then(function (data) {
        main2.variable = data;
      });
    };

    main2.searchRepsByState = function (state) {
      variable.repsByState(state).then(function (data) {
        main2.variable = data;
      });
    };

    main2.searchSensByState = function (state) {
      variable.sensByState(state).then(function (data) {
        main2.variable = data;
      });
    };
  });

angular
  .module('searchService', [])
  .factory('variable', function ($http) {
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
      sensByName: function (name) {
        return $http
          .get(host + '/sens/by-name/' + name)
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
        },
        sensByState: function (state) {
          return $http
            .get(host + '/sens/by-state/' + state)
            .then(function (response) {
              return response.data;
            });
    }};
  });


/*
  angular
    .module('SensAppControllers', [
      'sensService'
    ])
    .controller('MainCtrl2', function (sens) {
      var main3 = this;
      main3.sens = [];

      main3.searchByZip = function (zip) {
        sens.allByZip(zip).then(function (data) {
          main3.sens = data;
        });
      },
      main3.searchSensByLastName = function (lastname) {
        sens.sensByLastName(lastname).then(function (data) {
          main3.sens = data;
        });
      };
    });

  angular
    .module('sensService', [])
    .factory('sens', function ($http) {
      var host = 'http://dgm-representatives.herokuapp.com';
      return {
        allByZip: function (zip) {
          return $http
            .get(host + '/all/by-zip/' + zip)
            .then(function (response) {
              return response.data;
            });
      },
      sensByLastName: function (lastname) {
        return $http
          .get(host + '/sens/by-name/' + lastname)
          .then(function (response) {
            return response.data;
          });
    }};
 }); */
