//$(document).ready(function() {  
  
//    getCategories(); 
    getCurrentUser();
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
//    $('#id_alert').hide();
	

  
//}); 


function onLogin() {  
//	$('#id_alert').show();
	
	var url = window.location.href;
    var parts = url.split("?");
    if(parts.length>1){
    	
	       var urlparams = parts[1];
	       var params = urlparams.split("&");
	       var id = params[0].split("=")
	       
	       if (id[0]=='redirect') {
	    	   	$("#alertmessage1").text('');
	    	    $("#alertmessage1").hide();
	    	    
	    		if(($('#id_username').val() =='undefined' || $('#id_username').val() =='') &&
	    	       ($('#id_password').val() =='undefined' || $('#id_password').val() =='')){     
	    		      $("#alertmessage1").text('All fields are mandatory');
	    		      $("#alertmessage1").show('slow');
	    	    }else if($('#id_username').val() == 'undefined' || $('#id_username').val() ==''){
	    	      $("#alertmessage1").text('Username should not be empty');
	    	      $("#alertmessage1").show('slow');
	    	    }else if(!(/\S+@\S+\.\S+/.test($('#id_username').val()))){
	    	       $("#alertmessage1").text('Invalid email');
	    	       $("#alertmessage1").show('slow');
	    	    }else if($('#id_password').val() == 'undefined' || $('#id_password').val() ==''){
	    	      $("#alertmessage1").text('Password should not be empty');
	    	      $("#alertmessage1").show('slow');
	    	    }else{	
	    		
	    			var userData = {
	    		        email: $('#id_username').val(),
	    		        password: $('#id_password').val(),
	    		        businessId: 40
	    		    };
	    			
	    			 $.ajax({
	    			        type: "POST",
	    			        url: baseUrl+"v1/login",
	    			        data: userData,// now data come in this function
	    			        crossDomain: true,
	    			        dataType: "json",
	    			        success: function (data) {
	    		//	        	console.log(data);
	    			        	if(data.authToken){
	    			        		localStorage.setItem('currentUser',JSON.stringify(data.user));
	    			        		alert('Login Successful');
	    			        		if(id[1]==0){
	    			        			window.location = "index.html";
	    			        		}else{
	    			        			var id1 = params[1].split("=")
//	    			        			window.location = "DeliveryMethods.html";
	    			        			window.location = 'ShoppingCart.html?product='+id1[1]+'';
	    			        			
	    			        		}
	    			        	}
	    			        },error: function (jqXHR, status) {
	    			            // error handler
	    			            console.log(jqXHR);
	    			            alert('fail' + status.code);
	    			        }
	    			 });
	    		
	    	   }
	       }
	   
    }
	       	      	
}

function onRegister() {  
	  
	var url = window.location.href;
    var parts = url.split("?");
    if(parts.length>1){
    	
	       var urlparams = parts[1];
	       var params = urlparams.split("&");
	       var id = urlparams.split("=")
	       
	       if (id[0]=='redirect') {
	    	   	    	  	    
				$("#alertmessage").text('');
			    $("#alertmessage").hide();
			
			    if(($('#id_email').val() =='undefined' || $('#id_email').val() =='') &&
			       ($('#id_firstName').val() =='undefined' || $('#id_firstName').val() =='') &&
			       ($('#id_lastName').val() =='undefined' || $('#id_lastName').val() =='') &&
			       ($('#id_password1').val() =='undefined' || $('#id_password1').val() =='')){     
				      $("#alertmessage").text('All fields are mandatory');
				      $("#alertmessage").show('slow');
			    }else if($('#id_email').val() == 'undefined' || $('#id_email').val() ==''){
			      $("#alertmessage").text('Email should not be empty');
			      $("#alertmessage").show('slow');
			   }else if(!(/\S+@\S+\.\S+/.test($('#id_email').val()))){
			       $("#alertmessage").text('Invalid email');
			       $("#alertmessage").show('slow'); 
			    }else if($('#id_password1').val() == 'undefined' || $('#id_password1').val() ==''){
			      $("#alertmessage").text('Password should not be empty');
			      $("#alertmessage").show('slow');
			    }else if($('#id_firstName').val() == 'undefined' || $('#id_firstName').val() ==''){
			    	  $("#alertmessage").text('First name should not be empty');
				      $("#alertmessage").show('slow');
		         }else if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test($('#id_firstName').val()) || ($('#id_firstName').val().match(/^[0-9]+$/) != null)){
		        	  $("#alertmessage").text('Invalid first name');
				      $("#alertmessage").show('slow');
		         }else if($('#id_lastName').val() == 'undefined' || $('#id_lastName').val() ==''){
			    	  $("#alertmessage").text('Last name should not be empty');
				      $("#alertmessage").show('slow');
		         }else if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test($('#id_lastName').val()) || ($('#id_lastName').val().match(/^[0-9]+$/) != null)){
		        	 $("#alertmessage").text('Invalid last name');
				      $("#alertmessage").show('slow');
		         }else{
			//   if(typeof $scope.data.confirmpassword === 'undefined' || $scope.data.confirmpassword ===''){
			//      $scope.formvalidate ="false" ;
			//      $("#alertmessage").text('Confirm Password should not be empty');
			//      $("#alertmessage").show('slow');
			//      
			//   }
				   
				    var cart = JSON.parse(localStorage.getItem('cart'));
				    var userData = {
				    		
				        firstName: $('#id_firstName').val(),
				        lastName: $('#id_lastName').val(),
				        email: $('#id_email').val(),
				        password: $('#id_password1').val(),
				        businessId: 40
				    };
				    
				    if(cart != null && cart != '' && cart != 'null' && cart != 'undefined' && cart.length > 0){
				    	userData['cart_id'] = cart[0].local_id;
				    }
			    
					console.log(userData);
					$.ajax({
					        type: "POST",
					        url: baseUrl + "v1/register",
					        data: userData,// now data come in this function
					        crossDomain: true,
					        dataType: "json",
					        success: function (data) {
					        	if(data.authToken){
					        		localStorage.setItem('currentUser',JSON.stringify(data.user[0]));
					        		alert('Registeration Successful');
					        		if(id[1]==0){
	    			        			window.location = "index.html";
	    			        		}else{
	    			        			var id1 = params[1].split("=")
//	    			        			window.location = "DeliveryMethods.html";
	    			        			window.location = 'ShoppingCart.html?product='+id1[1]+'';
	    			        		}
					        		
					        	}
					        },error: function (jqXHR, status) {
					            // error handler
					            console.log(jqXHR.statusText);
					            if(jqXHR.statusText=='Conflict'){
					            	$("#alertmessage").text('Email already exist');
								      $("#alertmessage").show('slow');
					            }
//					            alert('fail' + status.code);
					        }
				     });	
			   }
			    
	    }
	       
    }
	
}

