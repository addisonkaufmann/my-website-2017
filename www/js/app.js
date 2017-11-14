var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home/name');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================

        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html'
        })
        
        // nested list with custom controller
        // .state('home.list', {
        //     url: '/list',
        //     templateUrl: 'templates/partial-home-list.html',
        //     controller: function($scope) {
        //         $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
        //     }
        // })
        
        // nested list with just some random string data
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

        .state('home.name',{
            url: '/name',
            templateUrl: 'templates/home-name.html'
        })

        .state('home.skills',{
            url: '/skills',
            templateUrl: 'templates/home-skills.html'
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

app.controller('scotchController', function($scope) {
    
    $scope.message = 'test';
   
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
});
