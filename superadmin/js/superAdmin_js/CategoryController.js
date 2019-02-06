function CategoryController($rootScope,$scope, $location, $http) {
    $rootScope.categoryForMun;
    $scope.adminusername=loginuser;
	$scope.Category = {};
	$scope.category={
		 catg_name :'',
		 catg_description :'',
		 catg_alias :'',
		 maincatg_id :'',
		 admin_id :'',
		 vendor_id :''
	};

	 	$scope.fillParentCategoryList = null;
	    //Declaring the function to load data from database
	    $scope.fillParentCategoryList = function () {
	        $http({
	            method: 'GET',
	            url: baseURL + 'admin/maincategory',
	            data: {}
	        }).success(function (result) {
	        	//alert(result);
	            $scope.fillParentCategoryList = result;
	        });
	    };
	    //Calling the function to load the data on pageload
	    $scope.fillParentCategoryList();

		$http.get(baseURL + 'admin/allcategory').success(function(res) {
				$scope.response = res;
				console.log(res);
				if (res.status == 'false') {
					alert(res.message);
				} else {
					$scope.Category=res;
					$rootScope.categoryForMun=res;
				}
			
			}).error(function() {
				alert("Please check your internet connection or data source..");
			});
			$scope.del=function(id){
			$http.get(baseURL + 'admin/deletecategory/'+id).success(function(res) {
				$scope.response = res;
				if (res.status == false) {
					alert(res.message);
				} else {
					//alert(res.message);
					$location.path('/category');
				}
			
			}).error(function() {
				alert("Please check your internet connection or data source..");
			});
				
			};
			
			$scope.addCategory=function(category){
				console.log(category);

				/*if (category.catg_name == '') {
					alert('Enter a Title ');
				}else if($scope.fillParentCategoryList[0].maincatg_id == ''){
				    alert('select parent category  ');
				}else if(category.catg_description == ''){
				    alert('Enter Description  ');
				} else if(category.catg_alias == ''){
				    alert('Enter alias without space  ');
				} else {*/
					$scope.maincategory = $scope.fillParentCategoryList[0].maincatg_id;
					category.vendor_id = 1;  
					category.admin_id = loginuserid; 
					category.maincatg_id = $scope.maincategory;          
					$http.post(baseURL + 'admin/addcategory', category).success(function(res) {
						$scope.response = res;
						console.log(res);
						if (res.status == false) {
							alert(res.message);
						} else {
							alert(res.message);
							$location.path("/category");
						}
					}).error(function() {
						alert("Please check your internet connection or data source..");
					});
				//}
			};
			
			$scope.goto=function(page){
				$location.path(page);	
			};
			
			$scope.edit=function(id){
				$location.path('/edit_category/'+id);	
			};
			
			$scope.categorydata=function(id){
				$location.path('/view_category/'+id);	
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

function CategoryEditController($rootScope,$scope, $location, $http,$routeParams) {
    $scope.adminusername=loginuser;
	$scope.categorydata={};

		var id=$routeParams.id;				
			$http.get(baseURL + 'admin/viewCategory/'+id).success(function(res) {
			 	console.log(res);
				 $scope.response = res;
				 $scope.categorydata=res;
			}).error(function() {
				 alert("Please check your internet connection or data source..");
		});
			 
		$scope.editCategory=function(categorydata){
		if (categorydata.catg_name == '') {
			alert('Enter a Title ');
		}else if(categorydata.maincatg_id == ''){
		    alert('select parent category  ');
		} else if(categorydata.catg_description == ''){
		    alert('Enter Description  ');
		} else if(categorydata.catg_alias == ''){
		    alert('Enter alias without space  ');
		} else {
			categorydata.vendor_id = 1;  
			categorydata.admin_id = loginuserid;  
			$http.post(baseURL + 'admin/editcategory', categorydata).success(function(res) {
				$scope.response = res;
				console.log(res);
				if (res.status == false) {
					alert(res.message);
				} else {
					$location.path("/category");
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
