
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	
	getHeaderCategories();
	getHeaderAccessoryCategories();
	getCurrentUser();

	function onLogout() { 
		localStorage.removeItem('currentUser');
		localStorage.removeItem('card');
		localStorage.removeItem('delivery');
		localStorage.removeItem('cart');
		window.location = "sellersignin.html";
	}
		
	function getCurrentUser() { 
		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if(currentUser == null || currentUser == 'undefined' || currentUser == ''){
			$('#id_curtuser').hide();
			 var loginHtml = '<a href="sellersignin.html">Sign in</a>';	                         
			 $('#id_login').append(loginHtml);
			 
		}else{
			$('#id_curtuser').show();
			 $('#id_name').append(""+currentUser.name);			
			 var logoutHtml = '<li><a href="#" onclick="onLogout()">Sign out</a></li>';
			 $('#id_logout').append(logoutHtml);
		}	
	}
	
	function onSearch(){
		var searchQuery = $('#id_searchInput').val();
		window.location = 'searchresult.html?query='+searchQuery;
	}
	
	function getBussinesses() {  
		window.location = "businesslist.html";
	}
	
	 function getHeaderCategories(){
	 
		 $.ajax({   
		        async: true,  
		        url: baseurl + 'categoriesbybusinessid/' + business_id.business_id,  
		        method: "GET",   
		        headers: {  
		            "accept": "application/json;odata=verbose",  
		            "content-type": "application/json;odata=verbose"  
		        },  
		        success: function(data) {
		        	
		        	$('#id_headerCategories').html('');
		        	var htmlHeaderCategories = '';
		        	var htmlFooterCategories = '';
		        	
		        	$(data).each(function( index, value ) {
		        		htmlHeaderCategories = htmlHeaderCategories + '<li><a href="itemlist.html?mcat_id=1?cat_id='+value.category_id+'">'+value.category_name+'</a></li>';
                          
//		        		htmlFooterCategories = htmlFooterCategories + '<a href="itemlist.html?mcat_id=1?cat_id='+value.category_id+'">'+value.category_name+'</a>';
//		        		$('#id_footerGadgets').append('<a href="itemlist.html?mcat_id=1?cat_id='+value.category_id+'"><p class="classTextColor">'+value.category_name+'</p></a>');
		        		if(index == 0){
		        			$('#id_footerParent').append('<a href="itemlist.html?mcat_id=1?cat_id='+value.category_id+'"><p class="classTextColor">Mobiles</p></a>');
		        		}
		        	});
		        	
		        	$('#id_footerParent').append(htmlFooterCategories);
		        	$('#id_footerParent').append('<a href="#"><p class="classTextColor">Computers</p></a>');
		        	$('#id_footerParent').append('<a href="#"><p class="classTextColor">Accessories</p></a>');
		        	$('#id_footerParent').append('<a href="#"><p class="classTextColor">Smart Watches</p></a>');

		        	$('#id_headerCategories').append(htmlHeaderCategories);
		        	$('#id_mobileCategories').html(htmlHeaderCategories);
		        }
	     });
	}
	

	function getHeaderAccessoryCategories(){
	 
		$.ajax({   
			   async: true,  
			   url: baseurl + 'categoriesbybusinessidAcc/' + business_id.business_id,  
			   method: "GET",   
			   headers: {  
				   "accept": "application/json;odata=verbose",  
				   "content-type": "application/json;odata=verbose"  
			   },  
			   success: function(data) {
				   
				   $('#id_headerAccessoriesCategory').html('');
				   var htmlheaderAccessoriesCategory = '';
				   var htmlFooterCategories = '';
				   
				   $(data).each(function( index, value ) {
					   htmlheaderAccessoriesCategory = htmlheaderAccessoriesCategory + '<li><a href="itemlist.html?mcat_id=2?cat_id='+value.category_id+'">'+value.category_name+'</a></li>';
						 
//		        		htmlFooterCategories = htmlFooterCategories + '<a href="itemlist.html?mcat_id=1?cat_id='+value.category_id+'">'+value.category_name+'</a>';
//		        		$('#id_footerGadgets').append('<a href="itemlist.html?mcat_id=1?cat_id='+value.category_id+'"><p class="classTextColor">'+value.category_name+'</p></a>');
					   if(index == 0){
						   $('#id_footerParent').append('<a href="itemlist.html?mcat_id=2?cat_id='+value.category_id+'"><p class="classTextColor">Earphones</p></a>');
					   }
				   });
				   
				   $('#id_footerParent').append(htmlFooterCategories);
				   $('#id_footerParent').append('<a href="#"><p class="classTextColor">Computers</p></a>');
				   $('#id_footerParent').append('<a href="#"><p class="classTextColor">Accessories</p></a>');
				   $('#id_footerParent').append('<a href="#"><p class="classTextColor">Smart Watches</p></a>');

				   $('#id_headerAccessoriesCategory').append(htmlheaderAccessoriesCategory);
				   $('#id_AccesoriesCategories').html(htmlheaderAccessoriesCategory);
			   }
		});
   }
   

/*
	function getHeaderAccessoryCategories(){
		var htmlHeaderAccessoriesCategories = "";
		htmlHeaderAccessoriesCategories = htmlHeaderAccessoriesCategories + '<li><a href="itemlist.html?mcat_id=2?cat_id=0">Chargerss</a></li>';		        	
		        	$('#id_headerAccessoriesCategory').append(htmlHeaderAccessoriesCategories);
	 
	}
	
*/
	
	
