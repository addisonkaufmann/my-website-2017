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
            templateUrl: 'templates/portfolio.html'
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
    $scope._timeout  = null;
    var pages = ['home.name', 'home.about', 'home.edu', 'home.exp', 'home.skill', 'home.contact'];
    $scope.length = pages.length;

    $scope.index = pages.indexOf($state.current.name);
    console.log($scope.index + ' ' + $scope.length);

    $scope.down = false;
    angular.element($window).bind("wheel", function(e) {
        $scope.index = pages.indexOf($state.current.name);

        if($scope._timeout){ //if there is already a timeout in process cancel it
            $timeout.cancel($scope._timeout);
        }
        $scope._timeout = $timeout(function(){
            $scope._timeout = null;

            if (e.wheelDeltaY > 0 && $scope.index > 0){
                $scope.index--;
                $scope.down = true;
                console.log('scrolled up: going to pages['+$scope.index+']' + pages[$scope.index] + ' ' + $scope.transition);
                $state.go(pages[$scope.index]);
            } else if (e.wheelDeltaY < 0 && $scope.index < pages.length-1){
                $scope.index++;
                $scope.down = false;
                console.log('scrolled down: going to pages['+$scope.index+'] ' + pages[$scope.index] + ' ' + $scope.transition);
                $state.go(pages[$scope.index]);
            } else if (e.wheelDeltaX < 0) {
                console.log('go to portfolio');
                $state.go('portfolio');
            }  
        },250);
    });

  
});

