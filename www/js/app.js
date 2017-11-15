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
    var i = 0;
    $scope.down = false;
    angular.element($window).bind("wheel", function(e) {
        if($scope._timeout){ //if there is already a timeout in process cancel it
            $timeout.cancel($scope._timeout);
        }
        $scope._timeout = $timeout(function(){
            $scope._timeout = null;

            var i = pages.indexOf($state.current.name);

            if (e.wheelDeltaY > 0 && i > 0){
                i--;
                $scope.down = true;
                console.log('scrolled up: going to pages['+i+']' + pages[i] + ' ' + $scope.transition);
                $state.go(pages[i]);
            } else if (e.wheelDeltaY < 0 && i < pages.length-1){
                i++;
                $scope.down = false;
                console.log('scrolled down: going to pages['+i+'] ' + pages[i] + ' ' + $scope.transition);
                $state.go(pages[i]);
            } else if (e.wheelDeltaX < 0) {
                console.log('go to portfolio');
                $state.go('portfolio');
            }  
        },250);
    });
});

