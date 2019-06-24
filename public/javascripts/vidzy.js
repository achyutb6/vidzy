var app = angular.module('Vidzy', ['ngResource','ngRoute']);

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-video', {
            templateUrl: 'partials/video-form.html',
            controller: 'AddVideoCtrl'
        })
        .when('/video/:id', {
            templateUrl: 'partials/video-form.html',
            controller: 'EditVideoCtrl'
        })
        .when('/video/delete/:id', {
            templateUrl: 'partials/video-delete.html',
            controller: 'DeleteVideoCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
}]);


app.controller('HomeCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        var Videos = $resource('/api/videos');
        Videos.query(function(videos){

        if ( $location.search().hasOwnProperty( 'genre' ) && $location.search().hasOwnProperty( 'keyword' )) {
               var genre = $location.search()['genre'];
               var keyword = $location.search()['keyword'];
               console.log(genre + " : "+ keyword);
               var result = videos.filter(function(item){console.log(item); return (item.genre == genre || genre.length == 0 ) && item.title.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 });
               console.log(result);
               $scope.videos = result;
        }else{
            $scope.videos = videos;
        }
    });
    }]);

app.controller('AddVideoCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.save = function(){
            var Videos = $resource('/api/videos');
            Videos.save($scope.video, function(){
                $location.path('/');
            });
        };
    }]);

app.controller('EditVideoCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){   
        var Videos = $resource('/api/videos/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });

        Videos.get({ id: $routeParams.id }, function(video){
            $scope.video = video;
        });

        $scope.save = function(){
            Videos.update($scope.video, function(){
                $location.path('/');
            });
        }
    }]);

app.controller('DeleteVideoCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var Videos = $resource('/api/videos/:id');

        Videos.get({ id: $routeParams.id }, function(video){
            $scope.video = video;
        })

        $scope.delete = function(){
            Videos.delete({ id: $routeParams.id }, function(video){
                $location.path('/');
            });
        }
    }]);

app.controller('SearchVideoCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        if ( $location.search().hasOwnProperty( 'genre' ) ) {
           var genre = $location.search()['genre'];
           console.log(genre);
           // 'myvalue' now stores '33'
        }
    }]);