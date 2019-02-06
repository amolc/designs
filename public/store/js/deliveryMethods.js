//$(document).ready(function() {  
  
//    getCart();
getCurrentUser();
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	
	populateCountries("country", "state");

     var transportationInfo = {
    	   delivery:'Free',
    	   duration:'2 - 7 Days',
    	   charges:'0'
     }
    
    $("#id_1stDiv").addClass('select');
    
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser);
	if(currentUser != null || currentUser != 'undefined' || currentUser != ''){
		$('#id_firstName').val(currentUser.firstName);
		$('#id_lastName').val(currentUser.lastName);
		$('#id_email').val(currentUser.email);	
	}else{
		 
	}
       
//});
  
function selected(id,deliveryType){
	transportationInfo = {};
	$('.charges').removeClass('select');
    $("#"+id).addClass('select');
    if(deliveryType == 0){
    	transportationInfo = {
    	   delivery:'Free',
    	   duration:'2 - 7 Days',
    	   charges:'0'
    }
    }else if(deliveryType == 1){
    	transportationInfo = {
    	    	   delivery:'Fast',
    	    	   duration:'Before 2 Days',
    	    	   charges:'25'
    	    	}
    }else if(deliveryType == 2){
     	transportationInfo = {
 	    	   delivery:'Collect From Shop',
 	    	   duration:'0',
 	    	   charges:'0'
 	    	}
    }
           
}

function getDeliveryInfo() {  

	if(($('#id_firstName').val() =='undefined' || $('#id_firstName').val() =='') ||
		       ($('#id_lastName').val() =='undefined' || $('#id_lastName').val() =='') ||
		       ($('#country').val() =='undefined' || $('#country').val() =='') ||
		       ($('#state').val() =='undefined' || $('#state').val() =='') ||
		       ($('#id_cityName').val() =='undefined' || $('#id_cityName').val() =='') ||
		       ($('#id_zipCode').val() =='undefined' || $('#id_zipCode').val() =='') ||
		       ($('#id_address').val() =='undefined' || $('#id_address').val() =='') ||
		       ($('#id_phone').val() =='undefined' || $('#id_phone').val() =='') ||
		       ($('#id_email').val() =='undefined' || $('#id_email').val() =='')
		       
	 ){     
			      $("#alertmessage").text('All fields are mandatory');
			      $("#alertmessage").show('slow');
     }else{
    	 
    	 var orderDeliveryInfo = {
			first_name: $('#id_firstName').val(),
			last_name: $('#id_lastName').val(),
			country: $('#country').val(),
			state: $('#state').val(),
			city: $('#id_cityName').val(),
			zipCode: $('#id_zipCode').val(),
			address: $('#id_address').val(),
			phone: $('#id_phone').val(),
			email: $('#id_email').val(),
			delivery: transportationInfo.delivery,
			duration: transportationInfo.duration,
			charges: transportationInfo.charges
		};
		
		localStorage.setItem('delivery',JSON.stringify(orderDeliveryInfo));
		
//		window.location = "PaymentMethods.html";
		window.location = "Confirmation.html";
		
		console.log(orderDeliveryInfo);
			   
    }
	
                     
}


