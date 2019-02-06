var loginuser="";
var loginuserid="";
var loginvendorid="";
function superadminLoginController($rootScope,$scope, $location, $http, $routeParams,store) {
	$rootScope.islogin=false;
	 $scope.init = function() {
            $scope.superadminSession = store.get('superadminSession') || {};
           
     };
	$scope.init();

	$scope.user = {
		/*user_id : '',
		first_name : '',
		last_name : '',*/
		user_id : '',
		username : '',
		password : ''
	};

	$scope.login = function(user) {
		if (user.username == '') {
			alert('Enter valid User Name ');
		} else if(user.password == ''){
		    alert('Enter password ');
		} else {		   
			
			$http.post(baseurl + 'adminLogin', user).success(function(res) {
				$scope.response = res;
				if (res.status == false) {
					alert(res.message);
				} else {
					loginuser=user.username;
					var superadminSession = {
                            'IsActive': res.record[0].IsActive,
                            'company_name' : res.record[0].company_name,
                            'email_id': res.record[0].email_id,
                            'first_name': res.record[0].first_name,
                            'last_name': res.record[0].last_name,
                            'user_id': res.record[0].user_id,
                            'user_type': res.record[0].user_type,
                            'username': res.record[0].username,
                            'islogin' : true
                        };
                    console.log("superadminSession:",superadminSession);
                        
                    store.set('superadminSession', superadminSession);
					$scope.init();
					$location.path("/viewusers");
				}
			}).error(function() {
				alert("Please check your internet connection or data source..");
			});
		}
	};

	$scope.logout=function(){
      store.remove('superadminSession');
      $location.path('/superadminlogin');		
	};
}

// log out controller
  

/*function adminLogoutController($rootScope,$scope, $location, $http, $routeParams) {
	$scope.logout=function(){
		console.log("calling logout");
      $location.path('/Adminlogin');		
	};
 
}*/