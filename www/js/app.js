var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home/name');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================

        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
        })
        
        .state('home.name',{
            url: '/name',
            templateUrl: 'templates/home-name.html'
        })

        .state('home.about', {
            url: '/about',
            templateUrl: 'templates/home-about.html'
        })

        .state('home.edu', {
            url: '/edu',
            templateUrl: 'templates/home-edu.html'
        })

        .state('home.exp', {
            url: '/exp',
            templateUrl: 'templates/home-exp.html'
        })

        .state('home.skill',{
            url: '/skill',
            templateUrl: 'templates/home-skill.html'
        })

        .state('home.contact',{
            url: '/contact',
            templateUrl: 'templates/home-contact.html'
        })

        .state('portfolio', {
            url: '/portfolio',
            templateUrl: 'templates/portfolio.html',
            controller: 'portCtrl',
            resolve: {
                items: function($http){
                    var path = "assets/json/portfolio.json";

                    return $http.get(path).then(function onSuccess(response){
                        return response.data;
                    })
                    .catch(function onError(response){
                        return [];
                    });
                }
            }
        })

        .state('detail', {
            url: '/:type/detail/:id',
            templateUrl: 'templates/detail.html',
            controller: 'detailCtrl', 
            resolve: {
                items: function($http, $stateParams){
                    var path = "assets/json/" + $stateParams.type + ".json";

                    return $http.get(path).then(function onSuccess(response){
                        return response.data;
                    })
                    .catch(function onError(response){
                        return [];
                    });
                }
            }
        })

        .state('projects', {
            url: '/projects',
            templateUrl: 'templates/projects.html',
            controller: 'projCtrl', 
            resolve: {
                items: function($http){
                    var path = "assets/json/projects.json";

                    return $http.get(path).then(function onSuccess(response){
                        return response.data;
                    })
                    .catch(function onError(response){
                        return [];
                    });
                }
            }
        })


        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'templates/partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': { 
                    templateUrl: 'templates/table-data.html',
                    controller: 'scotchController'
                }
            }
            
        });
        
});


app.controller('homeCtrl', function($scope, $window, $state, $timeout) {
    var pages = ['home.name', 'home.about', 'home.edu', 'home.exp', 'home.skill', 'home.contact'];
    $scope._timeout  = null;
    $scope.length = pages.length;
    $scope.index = pages.indexOf($state.current.name);
    $scope.down = false;
    angular.element($window).bind("wheel", function(e) {
        if (pages.indexOf($state.current.name) != -1){
            $scope.index = pages.indexOf($state.current.name);

            if($scope._timeout){
                $timeout.cancel($scope._timeout);
            }
            $scope._timeout = $timeout(function(){
                $scope._timeout = null;

                if (e.wheelDeltaY > 0 && $scope.index > 0){
                    $scope.goUp();
                } else if (e.wheelDeltaY < 0 && $scope.index < pages.length-1){
                    $scope.goDown(); 
                } else if (e.wheelDeltaX < 0) {
                    console.log('go to portfolio ' + e.wheelDeltaX);
                    $state.go('portfolio');
                } else if (e.wheelDeltaX > 0){
                    console.log('go to projects ' + e.wheelDeltaX);
                    $state.go('projects');
                }
            },250);
        }
    });

    $scope.goUp = function(){
        $scope.index--;
        $scope.down = true;
        console.log('scrolled up: going to pages['+$scope.index+']' + pages[$scope.index] + ' ' + $scope.transition);
        $state.go(pages[$scope.index]);
    };

    $scope.goDown = function(){
        $scope.index++;
        $scope.down = false;
        console.log('scrolled down: going to pages['+$scope.index+'] ' + pages[$scope.index] + ' ' + $scope.transition);
        $state.go(pages[$scope.index]);
    };
});


app.controller('portCtrl', function($scope, $window, $state, $timeout, $stateParams, items) {
    $scope._timeout  = null;
    $scope.step = -1;
    $scope.clicked = false;

    $scope.items = items;

    $scope.setStep = function(index){
        $scope.step = index;
    };

    $scope.goTo = function(index){
        console.log("going to " + $scope.items[index].name);
        $scope.clicked=true;
        $timeout(function () {
            $state.go('detail', {id: index, type: 'portfolio'});
        }, 600);

    };

    angular.element($window).bind("wheel", function(e) {
        if($scope._timeout){
            $timeout.cancel($scope._timeout);
        }
        $scope._timeout = $timeout(function(){
            $scope._timeout = null;

            if (e.wheelDeltaX > 0){
                console.log('go to home ' + e.wheelDeltaX);
                $state.go('home.name');
            }
        },250);
    });
});

app.controller('detailCtrl', function($scope, $window, $state, $timeout, $stateParams, items){

    $scope.items = items;

    var id = parseInt($stateParams.id); 
    var type = $stateParams.type;
    $scope.id = id;
    $scope.name = $scope.items[id].name;

    $scope.close = function(){
        $state.go(type);
    };

    $scope.goLeft = function(){
        $state.go('detail', {id: id-1, type: type});
    };

    $scope.goRight = function(){
        $state.go('detail', {id: id+1, type: type});
    };

});

app.controller('projCtrl', function($scope, $window, $state, $timeout, items) {
    $scope._timeout  = null;
    $scope.step = -1;
    $scope.clicked = false;

    console.log(items);
    $scope.items =items;
    $scope.setStep = function(index){
        $scope.step = index;
        console.log('set step to ' + $scope.step);
    };

    $scope.goTo = function(index){
        console.log("going to " + $scope.items[index].name);
        $scope.clicked=true;
        $timeout(function () {
            $state.go('detail', {id: index, type: 'projects'});
        }, 600);
    };

    angular.element($window).bind("wheel", function(e) {
        if($scope._timeout){
            $timeout.cancel($scope._timeout);
        }
        $scope._timeout = $timeout(function(){
            $scope._timeout = null;

            if (e.wheelDeltaX < 0) {
                console.log('go to home ' + e.wheelDeltaX);
                $state.go('home.name');
            }
        },250);
    });
});

