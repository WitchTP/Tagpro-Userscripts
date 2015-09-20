// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
.controller('groupController', ['$scope', 'groupLister', function($scope, groupLister) {
  $scope.setGroups = function() {
    $scope.Groups = groupLister();
    console.log(angular.toJson($scope.Groups));
  }
}])
.factory('groupLister', ['$http', '$q', function($http, $q) {
  var request = require('request');
  var cheerio = require('cheerio');
  
  var baseLinks = [
    "http://tagpro-radius.koalabeast.com/groups",
    "http://tagpro-pi.koalabeast.com/groups",
    "http://tagpro-origin.koalabeast.com/groups",
    "http://tagpro-segment.koalabeast.com/groups",
    "http://tagpro-sphere.koalabeast.com/groups",
    "http://tagpro-centra.koalabeast.com/groups",
    "http://tagpro-arc.koalabeast.com/groups",
    "http://tagpro-orbit.koalabeast.com/groups",
    "http://tagpro-chord.koalabeast.com/groups",
    "http://tagpro-diameter.koalabeast.com/groups"
  ];
  
  var createGroup = function(name, link, count) {
    return {
      'name': name,
      'link': link,
      'count': count
    };
  };
  
  var scrapeGroups = function(url) {
    return $http.get(url).then(function(response) {
      var groups = [];
      var html = response.data;
      var $ = cheerio.load(html);
      $('.board tr:has(td)').filter(function() {
        var data = $(this);
        var name = data.children().first().text();
        var link = url + data.children().first().children().first().attr('href');
        var count = data.children().last().text();
        groups.push(createGroup(name, link, count));
      });
      return groups;
    });
  };
  
  return function() {
    var groupList = [];
    var asyncList = [];
    
    for (var i = 0; i < baseLinks.length; ++i) {
      asyncList.push(scrapeGroups(baseLinks[i]));
    }
    
    for (var i = 0; i < asyncList.length; ++i) {
      asyncList[i].then(function(result) {
        groupList.concat(result);
      });
    }
    
    return groupList;
  };
}])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});