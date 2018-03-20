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
        })

        .state('detail', {
            url: '/portfolio/detail/:id',
            templateUrl: 'templates/portfolio-detail.html',
            controller: 'portDetailCtrl'
        })

        .state('projects', {
            url: '/projects',
            templateUrl: 'templates/projects.html',
            controller: 'projCtrl'
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
                };
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


app.controller('portCtrl', function($scope, $window, $state, $timeout, $stateParams) {
    $scope._timeout  = null;
    console.log('port');
    $scope.step = -1;
    $scope.clicked = false;


    $scope.items = [
        {name: "Higher Ground", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/116eb963276571.5aac2b052fbed.png"},
        {name: "Funk Water", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/e4209c63188451.5aa8a9cee57f6.jpg"},
        {name: "Domain of the Gods", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/83c37261927485.5a7e479855b63.jpg"},
        {name: "Red Threads", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/fbcb3356154929.59a318472283c.png"},
        {name: "Desire & Innocence", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/7283ad53432795.5934c5b08e214.png"},
        {name: "The Knotted Sepal", src: "https://mir-cdn.behance.net/v1/rendition/project_modules/fs/d8381749920273.5aaef2a5d9146.jpg"},
        {name: "Living Museum", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/cca87348882709.593628e156a4f.png"},
    ];

    $scope.setStep = function(index){
        $scope.step = index;
    };

    $scope.goTo = function(index){
        console.log("going to " + $scope.items[index].name);
        $scope.clicked=true;
        $timeout(function () {
            $state.go('detail', {id: index});
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
            };
        },250);
    });
});

app.controller('portDetailCtrl', function($scope, $window, $state, $timeout, $stateParams){
    $scope.items = [
        {name: "Higher Ground", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/116eb963276571.5aac2b052fbed.png"},
        {name: "Funk Water", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/e4209c63188451.5aa8a9cee57f6.jpg"},
        {name: "Domain of the Gods", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/83c37261927485.5a7e479855b63.jpg"},
        {name: "Red Threads", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/fbcb3356154929.59a318472283c.png"},
        {name: "Desire & Innocence", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/7283ad53432795.5934c5b08e214.png"},
        {name: "The Knotted Sepal", src: "https://mir-cdn.behance.net/v1/rendition/project_modules/fs/d8381749920273.5aaef2a5d9146.jpg"},
        {name: "Living Museum", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/cca87348882709.593628e156a4f.png"},
    ];

    var id = $stateParams.id; 
    $scope.name = $scope.items[id].name;

    $scope.close = function(){
        $state.go('portfolio');
    }


});

app.controller('projCtrl', function($scope, $window, $state, $timeout) {
    $scope._timeout  = null;

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

