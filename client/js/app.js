
//alert('hello world');


angular.module('RepsApp', [

  'RepsAppControllers'
]);



angular.module('RepsAppControllers',[
  'repsService'
])
.controller('MainCrtl', function(reps){
  this.foo = 'hello world'; //Variable deklarieren - wird hier nicht gebraucht

  var main = this; //By using var we can use the variable also within other functions
  main.reps =[];
  main.sens =[];




/*  $http
  .get('http://dgm-representatives.herokuapp.com/reps/by-name/Smith')
  .then(function(res){ // res = response
    main.reps = res.data;
  //console.log(res);
  }); */

  main.searchRepsByZip = function (zip){
    reps.allByZip(zip).then(function(data){
      main.reps = data;
    });
  };

  main.searchRepsByName = function (name){
    reps.repsByName(name).then(function(data){
      main.reps = data;
    });
  };
  main.searchRepsByState = function (state){
    reps.repsBySate(state).then(function(data){
      main.reps = data;
    });
  };
});

angular
.module('repsService', [])
.factory('reps', function ($http){
  var host = 'http://dgm-representatives.herokuapp.com';
  return {
    allByZip: function(zip){
      return $http
      .get(host +'/all/by-zip/' + zip)
      .then(function(response){
        return response.data;
    });
  },
  repsByName: function(name){
    return $http
    .get(host +'/reps/by-name/' + name)
    .then(function(response){
      return response.data;
  });
},
repsBySate: function(state){
  return $http
  .get(host +'/reps/by-state/' + state)
  .then(function(response){
    return response.data;
});
}
  };
});
