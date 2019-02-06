//$(document).ready(function() {  
  
//    getCategories(); 
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
//    $('#id_alert').hide();
  
//}); 


function onLogin() {  
	
//	$('#id_alert').show();
	
//	var url = window.location.href;
//    var parts = url.split("?");
//    if(parts.length>1){
//    	
//	       var urlparams = parts[1];
//	       var params = urlparams.split("&");
//	       var id = urlparams.split("=")
//	       if (id[0]=='redirect') {
	    	   	$("#alertmessage1").text('');
	    	    $("#alertmessage1").hide();
	    	    
	    		if(($('#id_number').val() =='undefined' || $('#id_number').val() =='') &&
	    	       ($('#id_password').val() =='undefined' || $('#id_password').val() =='')){     
	    		      $("#alertmessage1").text('All fields are mandatory');
	    		      $("#alertmessage1").show('slow');
	    	    }else if($('#id_number').val() == 'undefined' || $('#id_number').val() ==''){
	    	      $("#alertmessage1").text('Number should not be empty');
	    	      $("#alertmessage1").show('slow');
	    	    }
//	    	    else if(!(/\S+@\S+\.\S+/.test($('#id_username').val()))){
//	    	       $("#alertmessage1").text('Invalid email');
//	    	       $("#alertmessage1").show('slow');
//	    	    }
	    	    else if($('#id_password').val() == 'undefined' || $('#id_password').val() ==''){
	    	      $("#alertmessage1").text('Password should not be empty');
	    	      $("#alertmessage1").show('slow');
	    	    }else{
	    	    		    	    		    		
	    			var userData = {
	    		        number: $('#id_number').val(),
	    		        password: $('#id_password').val(),
					};
					console.log(userData);
	    			
	    			 $.ajax({
	    			        type: "POST",
	    			        url: baseUrl+"gadgetsinasialogin",
	    			        data: userData,
	    			        crossDomain: true,
	    			        dataType: "json",
	    			        success: function (data) {
								console.log(data.status);
								
	    			        	if(data.status==true){
	    			        		localStorage.setItem('currentUser',JSON.stringify(data.record[0]));
	    			        		window.location = "clientProfile.html";
	    			        		
//	    			        		if(id[1]==0){
//	    			        			window.location = "index.html";
//	    			        		}else{
//	    			        			window.location = "confirmation.html";
//	    			        		}
	    			        	}else{
									
	    			            alert(data.message);
								}
	    			        },error: function (jqXHR, status) {
	    			            // error handler
	    			            console.log(jqXHR);
	    			            alert('fail' + status.code);
	    			        }
	    			 });
	    		
	    	   }
//	       }
//	   
//    }
	       	      	
}


function onRegister() {  
	  
	$("#alertmessage").text('');
    $("#alertmessage").hide();

    if(($('#id_email').val() =='undefined' || $('#id_email').val() =='') &&
       ($('#id_username1').val() =='undefined' || $('#id_username1').val() =='') &&
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
   }else{
//   if(typeof $scope.data.confirmpassword === 'undefined' || $scope.data.confirmpassword ===''){
//      $scope.formvalidate ="false" ;
//      $("#alertmessage").text('Confirm Password should not be empty');
//      $("#alertmessage").show('slow');
//      
//   }
	   
	    var cart = JSON.parse(localStorage.getItem('cart'));
	    var userData = {
	        email: $('#id_username1').val(),
	        password: $('#id_password1').val(),
	        businessId: business_id.business_id
	    };
	    
	    if(cart != null && cart != '' && cart != 'null' && cart != 'undefined' && cart.length > 0){
	    	userData['cart_id'] = cart[0].local_id;
	    }

		$.ajax({
		        type: "POST",
		        url: baseUrl + "v1/register",
		        data: userData,// now data come in this function
		        crossDomain: true,
		        dataType: "json",
		        success: function (data) {
		        	if(data.authToken){
		        		localStorage.setItem('currentUser',JSON.stringify(data.user));
		        		alert('Registeration Successful');
		        		window.location = "index.html";
		        	}
		        },error: function (jqXHR, status) {
		            // error handler
		            console.log(jqXHR);
		            alert('fail' + status.code);
		        }
	     });	
   }
	
}


function onSellerRegister() {  
	  
	$("#alertmessage").text('');
	$("#alertmessage").hide();
	
    if(($('#id_email').val() =='undefined' || $('#id_email').val() =='') &&
       ($('#id_Name').val() =='undefined' || $('#id_Name').val() =='') &&
	   ($('#id_password1').val() =='undefined' || $('#id_password1').val() =='') &&
	   ($('#id_country').val() =='undefined' || $('#id_country').val() =='') &&
	   ($('#business_name').val() =='undefined' || $('#business_name').val() =='') &&
       ($('#id_mobileNumber').val() =='undefined' || $('#id_mobileNumber').val() =='')) {     
	      $("#alertmessage").text('All fields are mandatory');
	      $("#alertmessage").show('slow');
    }else if($('#id_Name').val() == 'undefined' || $('#id_Name').val() ==''){
        $("#alertmessage").text('Name should not be empty');
        $("#alertmessage").show('slow');
    }else if($('#id_email').val() == 'undefined' || $('#id_email').val() ==''){
      $("#alertmessage").text('Email should not be empty');
      $("#alertmessage").show('slow');
    }else if(!(/\S+@\S+\.\S+/.test($('#id_email').val()))){
       $("#alertmessage").text('Invalid email');
       $("#alertmessage").show('slow');
    }else if($('#id_mobileNumber').val() == 'undefined' || $('#id_mobileNumber').val() ==''){
        $("#alertmessage").text('Mobile should not be empty');
        $("#alertmessage").show('slow');
     }else if($('#id_country').val() == 'undefined' || $('#id_country').val() ==''){
         $("#alertmessage").text('Country should not be empty');
         $("#alertmessage").show('slow');
     }else if($('#id_password1').val() == 'undefined' || $('#id_password1').val() ==''){
      $("#alertmessage").text('Password should not be empty');
      $("#alertmessage").show('slow');
    }else if($('#id_confirmPassword').val() == 'undefined' || $('#id_confirmPassword').val() ==''){
     
      $("#alertmessage").text('Confirm password name should not be empty');
      $("#alertmessage").show('slow');
      
    }else if($('#id_confirmPassword').val() != $('#id_password1').val()){
    
      $("#alertmessage").text('Confirm password mismatch with password');
      $("#alertmessage").show('slow');
      
   }else{
    	 
	    var bussinessData = {
	        name: $('#id_Name').val(),
	        email_id: $('#id_email').val(),
	        country: $('#id_country').val(),
	        mobile_number: $('#id_mobileNumber').val(),
			password:$('#id_password1').val(),
			business_name: $('#business_name').val()
		};
		console.log(bussinessData);

		$.ajax({
		        type: "POST",
		        url: baseUrl + "sellerRegister",
		        data: bussinessData,// now data come in this function
		        crossDomain: true,
		        dataType: "json",
		        success: function (data) {
		        	
		        	if(data.status == false){
		        		$("#alertmessage").text(data.message);
		        	    $("#alertmessage").show('slow');
		        	}
		        	if(data.status == true){
		        		$.ajax({
			    		        type: "GET",
			    		        url: baseurl+"copyportalmobilecategory/"+business_id.business_id+"/"+data.record.insertId,
			    		        crossDomain: true,
			    		        dataType: "json",
			    		        success: function (res) {
			    		        	
			    		        	var postData1 = {
			    		        		business_id:data.record.insertId,
			    		        		amount:50
			    		        	};
			    		        	
			    		        	$.ajax({
			    				        type: "POST",
			    				        url: baseUrl + "addWalletAmount",
			    				        data: postData1,// now data come in this function
			    				        crossDomain: true,
			    				        dataType: "json",
			    				        success: function (data1) {
			    				        	
			    				        	window.location = "RegisterSuccessful.html?host="+data.record.insertId;
			    				        },error: function (jqXHR, status) {
			    				            // error handler
			    				            console.log(jqXHR);
			    				            alert('fail' + status.code);
			    				        }
			    			     });
			    		        		
//			    		        	$.ajax({
//					    		        type: "GET",
//					    		        url: baseurl+"copyportalmobile/"+data.record.insertId,
//					    		        crossDomain: true,
//					    		        dataType: "json",
//					    		        success: function (res) {					    		        	
//					    		        	window.location = "RegisterSuccessful.html?host="+data.record.insertId;					    		        	
//					    		        },error: function (jqXHR, status) {
//					    		            // error handler
//					    		            console.log(jqXHR);
//					    		            alert('fail' + status.code);
//					    		        }
//						    	   });
			    		        	
			    		        	console.log(res);
			    		        },error: function (jqXHR, status) {
			    		            // error handler
			    		            console.log(jqXHR);
			    		            alert('fail' + status.code);
			    		        }
			    	     });
		        				        			
		        	
		        	}
		        },error: function (jqXHR, status) {
		            // error handler
		            console.log(jqXHR);
		            alert('fail' + status.code);
		        }
	     });
	    
   }
	
}

