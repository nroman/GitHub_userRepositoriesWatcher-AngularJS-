(function(){
    var app = angular.module("AngularJS",[]);    
    
    var MainController = function($scope, $http){
        $scope.message = "Find user repositories on GitHub";
        
        var onUserComplete = function(response){
            $scope.user = response.data;
            $scope.error = "";
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };
        
        var onError = function(reason){
            $scope.error = "Could not fetch user";
        };
        $scope.username="angular";
        
        var onRepos = function(response){
            $scope.repos = response.data;
        };
        
        
        $scope.search = function(username){
            $http.get("https://api.github.com/users/" + username)
            .then(onUserComplete, onError);
        };
        
        //oreder
        $scope.reposSortOrder = '-stargazers_count';
    };
    
    app.controller("MainController", MainController);  

}());