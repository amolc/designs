function MCategoryController($rootScope,$scope, $location, $http) {
    $rootScope.categoryForMun;
    $scope.adminusername=loginuser;
	$scope.mainCategory = {};
	$scope.category={
		 maincatg_name :'',
		 maincatg_description :'',
		 maincatg_alias :'',
		 admin_id :''
	};
		$http.get(baseURL + 'admin/maincategory').success(function(res) {
				$scope.response = res;
				console.log(res);
				if (res.status == 'false') {
					alert(res.message);
				} else {
					$scope.mainCategory=res;
					$rootScope.categoryForMun=res;
				}
			
			}).error(function() {
				alert("Please check your internet connection or data source..");
			});
			$scope.del=function(id){
			$http.get(baseURL + 'admin/deletemaincategory/'+id).success(function(res) {
				$scope.response = res;
				if (res.status == false) {
					alert(res.message);
				} else {
					//alert(res.message);
					$location.path('/main_category');
				}
			
			}).error(function() {
				alert("Please check your internet connection or data source..");
			});
				
			};
			
			$scope.addMainCategory=function(maincategory){
				console.log(maincategory);
				if (maincategory.maincatg_name == '') {
					alert('Enter a Title ');
				} else if(maincategory.maincatg_description == ''){
				    alert('Enter Description  ');
				} else if(maincategory.maincatg_alias == ''){
				    alert('Enter alias without space  ');
				} else {
					maincategory.admin_id = loginuserid;	      
					$http.post(baseURL + 'admin/addmaincategory', maincategory).success(function(res) {
						$scope.response = res;
						console.log(res);
						if (res.status == false) {
							alert(res.message);
						} else {
							alert(res.message);
							$location.path("/main_category");
						}
					}).error(function() {
						alert("Please check your internet connection or data source..");
					});
				}
			};
			
			$scope.goto=function(page){
				$location.path(page);	
			};
			
			$scope.edit=function(id){
				$location.path('/editmain_category/'+id);	
			};
			
			$scope.maincategorydata=function(id){
				$location.path('/viewmain_category/'+id);	
			};
			
			/*$scope.maincategorydata=function(id){
				alert("new");
				$location.path('/viewmain_category/'+id);	
			};*/

		$scope.showhide = function(id){
		if(document.getElementById(id).style.display == 'none'){
	    	document.getElementById(id).style.display = 'block';
	   	}else{
	   		document.getElementById(id).style.display = 'none';
	   	}
   };
	
}

function MCategoryEditController($rootScope,$scope, $location, $http,$routeParams) {
    $scope.adminusername=loginuser;
	$scope.maincategorydata={};

		var id=$routeParams.id;				
			$http.get(baseURL + 'admin/viewMainCategory/'+id).success(function(res) {
			 	console.log(res);
				 $scope.response = res;
				 $scope.maincategorydata=res;
			}).error(function() {
				 alert("Please check your internet connection or data source..");
		});
			 
		$scope.editMainCategory=function(maincategorydata){
		if (maincategorydata.maincatg_name == '') {
			alert('Enter a Title ');
		} else if(maincategorydata.maincatg_description == ''){
		    alert('Enter Description  ');
		} else if(maincategorydata.maincatg_alias == ''){
		    alert('Enter alias without space  ');
		} else {
			maincategorydata.admin_id = loginuserid;
			$http.post(baseURL + 'admin/editmaincategory', maincategorydata).success(function(res) {
				$scope.response = res;
				console.log(res);
				if (res.status == false) {
					alert(res.message);
				} else {
					$location.path("/main_category");
				}
			}).error(function() {
				alert("Please check your internet connection or data source..");
			});
		}
		};
		$scope.goto=function(page){
				$location.path(page);	
			};
  $scope.showhide = function(id){
	if(document.getElementById(id).style.display == 'none'){
    document.getElementById(id).style.display = 'block';
   }else{
   	document.getElementById(id).style.display = 'none';
   }
   };
   
}
