function businessController($rootScope, $scope, $location, $http, $routeParams , store) {

    $scope.init = function() {
        $scope.superadminSession = store.get('superadminSession') || {};
    };

    $scope.init();

    $scope.adduser = function(addusersfrm) {
        if (addusersfrm.$valid) {
            $scope.businessdata.superadmin_id = $scope.superadminSession.user_id;
            $http.post(baseurl + 'addbusiness', $scope.businessdata).success(function(res) {
                if (res.status == true) {
                    $location.path("/viewusers");
                    $scope.getbusinesslists();
                } else {
                    console.log("err res:", res);
                }
            }).error(function(error) {
                console.log("error in save other 1", error);
            });
        }

    };

    $scope.getbusinesslists = function() {
        var user_id = $scope.superadminSession.user_id;
        $http.get(baseurl + 'getbusinesslist/' + user_id).success(function(res) {
            $scope.businessuserlist = res;
        }).error(function(error) {
            console.log("error in save other 1", error);
        });
    };

    $scope.getbusinesslists();


    $scope.deletebusiness = function(id) {
        $http.get(baseurl + 'deletebusinessrecord/' + id).success(function(res) {
            if (res.status == false) {
                alert(res.message);
            } else {
                $location.path('/viewusers');
            }

        }).error(function() {
            alert("Please check your internet connection or data source..");
        });

    };

    $scope.goto = function(page) {
        $location.path(page);
    };

    $scope.showhide = function(id) {
        if (document.getElementById(id).style.display == 'none') {
            document.getElementById(id).style.display = 'block';
        } else {
            document.getElementById(id).style.display = 'none';
        }
    };

    $scope.edituser = function(id) {
        $location.path('/edit_user/' + id);
    }

    $scope.getbusinessdetails = function() {
        $http.get(baseurl + 'getbusinessdetails/' + $routeParams.id).success(function(res) {
            if (res) {
                $scope.businessdata = res[0];
            }

        }).error(function() {
            alert("Please check your internet connection or data source..");
        });
    }

    if ($routeParams.id) {
        $scope.getbusinessdetails()
    };


    $scope.updateuser = function(updateusersfrm) {
        if (updateusersfrm.$valid) {
            $scope.businessdata.superadmin_id = $scope.superadminSession.user_id;
            $http.post(baseurl + 'updateuserdetails', $scope.businessdata).success(function(res) {
                if (res.status == true) {
                    $location.path("/viewusers");
                    $scope.getbusinesslists();
                } else {
                    console.log("err res:", res);
                }
            }).error(function(error) {
                console.log("error in save other 1", error);
            });
        }
    };
}
