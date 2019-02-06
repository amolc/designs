
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	
	$('#id_businessName').append(bussiness.business_name);
	$('#id_title').append(bussiness.business_name);
	
	getHeaderCategories();
	getHeaderAccessoryCategories();
	function onLogout() { 
		localStorage.removeItem('currentUser');
		localStorage.removeItem('card');
		localStorage.removeItem('delivery');
		localStorage.removeItem('cart');
		window.location = "LoginForm.html?redirect=0";
	}
		
	function getCurrentUser() { 
			
		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if(currentUser == null || currentUser == 'undefined' || currentUser == ''){
			 var loginHtml = '<a href="LoginForm.html?redirect=0">Login/Sign Up</a>';
			 $('#id_loginLogout').append(loginHtml);
		}else{
			 var logoutHtml = '<a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"> '+currentUser.firstName+'</i></a>'
				 
			     +'<div class="dropdown-menu animated-2s fadeInUpHalf" style="width: 99px;margin-right: 74px;">'
			     +'<div class="mega-inside">'
			     +'<div class="top-lins" style="padding-bottom: 0px; border-bottom: 0px;">'
                 +'<ul id="id_headerCategories">'
                    +'<li><a href="#" onclick="onLogout()" id="id_logout">Logout</a></li>'                
                 +'</ul>' 
                 +'</div>'	
                 +'</div>'
                 +'</div>';
			 $('#id_loginLogout').append(logoutHtml);
		}	
	}
	
	function onSearch(){
		var searchQuery = $('#id_searchInput').val();
		window.location = 'searchresult.html?query='+searchQuery;
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
		        		htmlHeaderCategories = htmlHeaderCategories + '<li><a href="index.html?cat='+value.category_id+'">'+value.category_name+'</a></li>';
                       
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
		var htmlHeaderAccessoriesCategories = "";
		htmlHeaderAccessoriesCategories = htmlHeaderAccessoriesCategories + '<li><a href="itemlist.html?mcat_id=2?cat_id=0">Chargersss</a></li>';	
		        	
		        	$('#id_headerAccessoriesCategory').append(htmlHeaderAccessoriesCategories);
		        
	}
	
