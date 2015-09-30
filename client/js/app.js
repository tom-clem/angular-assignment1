
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
    main2.congressType = 'Reps'; // Hinzugefügt - braucht man nicht um ürsprüngliche version zu benutzen

    main2.loading = false;

    main2.apis = [
      {
      label: 'Zip',
      method: function(zip){
        main2.loading = true;
        variable('all','zip', zip).then(function(data){
          main2.variable = data;
          main2.loading = false;
        });
      }
    },
    {
      label: 'Last Name',
      method: function(name){
          main2.loading = true;
        variable(main2.congressType,'name',name).then(function(data){
          main2.variable = data;
            main2.loading = false;
        });
      }
    },
    {
      label: 'State',
      method: function(state){
          main2.loading = true;
        variable(main2.congressType,'state',state).then(function(data){
          main2.variable = data;
            main2.loading = false;
        });
    }
  }];
    main2.criteria = main2.apis[0];

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


/**
function search replaces the code, which would be needed for all the criteria siehe unten
*/
function search(type, criteria, query){

  return $http
  .get(host + '/' + type + '/by-' + criteria + '/' + query)
  .then(function (response) {
    return response.data;
  });
}
search.allByZip = search.bind(null, 'all', 'zip'); /** calls search function with the parameters (without query) query wird von der Funktion die die Funktion aufruft übergeben. Diese Funktion übergibt der obrigen immer nur "2" Parameter*/
search.repsByName = search.bind(null, 'reps', 'name');
search.repsByState = search.bind(null, 'reps', 'state');
search.sensByName = search.bind(null, 'sens', 'name');
search.sensByState = search.bind(null, 'sens', 'state');

return search;
/**
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
    }}; */
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
