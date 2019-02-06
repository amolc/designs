function adminController($rootScope,$scope, $location, $http) {

    $rootScope.stateForMun;
    $scope.adminusername=loginuser;
    $scope.states = {};
    $scope.state={
        statename :'',
        statelocation :''
    };
    $http.get(baseURL + 'state').success(function(res) {
        $scope.response = res;
        console.log(res);
        if (res.status == 'false') {
            alert(res.message);
        } else {
            $scope.states=res;
            $rootScope.stateForMun=res;
        }

    }).error(function() {
        alert("Please check your internet connection or data source..");
    });
}