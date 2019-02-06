//$(document).ready(function() {  
  
    getCurrentUser();
    updateCartDetails(); 
    updateCardDetails();
    updateDeliveryDetails();
    var business_id = business_id;
    var appname = appname;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	
	$('#id_loading').hide();
	$('#id_submit').show();
	 
//}); 
	
function updateCartDetails(){
		 var cart = JSON.parse(localStorage.getItem('cart'));
		 var delivery = JSON.parse(localStorage.getItem('delivery'));
		 if(cart != null && cart != ''){
			     $('#id_grandTotal').html('');
			     
				 var htmlCartDetails = "";
				 var grandTotal = parseInt(delivery.charges);
				 $(cart).each(function( index, value ) {
					 grandTotal = grandTotal + parseInt(value.total_price);
					 htmlCartDetails = htmlCartDetails + '<ul class="row check-item">'
			            +'<li class="col-xs-6">'
			            +'<p>'+value.item_name+'</p>'
			            +'</li>'
			            +'<li class="col-xs-2 text-center">'
			            +'<p>$'+value.item_price+'</p>'
			            +'</li>'
			            +'<li class="col-xs-2 text-center">'
			            +'<p>'+value.quantity+' Items</p>'
			            +'</li>'
			            +'<li class="col-xs-2 text-center">'
			            +'<p>$'+value.total_price+'</p>'
			            +'</li>'
			            +'</ul>';
			
		    	 });				 
				 $('#id_cartProductDetails').append(htmlCartDetails);
				 
				 $('#id_grandTotal').append("$"+grandTotal);
				 localStorage.setItem('grand_total',grandTotal);
		 }
}

function updateCardDetails(){
//	 var card = JSON.parse(localStorage.getItem('card'));
//	 if(card != null && card != 'undefined'){

//		    var cardImage = '';
//		    if(card.card.brand == 'Visa'){
//		    	cardImage = 'images/visa-card.jpg';
//		    }
//		    var htmlCardDetails = '<li class="col-xs-6">'
//	              +'<p><img class="margin-right-20" src="'+cardImage+'" alt="">'+card.card.brand+' Credit Card</p>'
//	              +'</li>'
//	              +'<li class="col-xs-6 text-center">'
//	              +'<p>Card number:   XXX-XXX-XXX-'+card.card.last4+'</p>'
//	              +'</li>';
		    
		    var htmlCardDetails = '<li class="col-xs-6">'
	                              +'<p>Card Payment</p></li>'
					              +'<li class="col-xs-6 text-center">'
					              +'</li>';
						 
			 $('#id_cardDetails').append(htmlCardDetails);
			 
//	 }
}

function updateDeliveryDetails(){
	 var delivery = JSON.parse(localStorage.getItem('delivery'));
	 if(delivery != null && delivery != 'undefined'){
		   
		    console.log(delivery);

		    var htmlDeliveryDetails = '<li class="col-sm-3">'
	              +'<h6>Name</h6>'
	              +'<span>'+delivery.first_name+'</span> </li>'
	              +'<li class="col-sm-3">'
	              +'<h6>Phone</h6>'
	              +'<span>'+delivery.phone+'</span> </li>'
	              +'<li class="col-sm-3">'
	              +'<h6>Country</h6>'
	              +'<span>'+delivery.country+'</span> </li>'
	              +'<li class="col-sm-3">'
	              +'<h6>Email</h6>'
	              +'<span>'+delivery.email+'</span> </li>'
	              +'<li class="col-sm-3">'
	              +'<h6>City</h6>'
	              +'<span>'+delivery.city+'</span> </li>'
	              +'<li class="col-sm-3">'
	              +'<h6>State</h6>'
	              +'<span>'+delivery.state+'</span> </li>'
	              +'<li class="col-sm-3">'
	              +'<h6>Zipcode</h6>'
	              +'<span>'+delivery.zipCode+'</span> </li>'
	              +'<li class="col-sm-3">'
	              +'<h6>Address</h6>'
	              +'<span>'+delivery.address+'</span>' 
	              +'</li>';
		    
		    var htmlTransportationDetails = '<li class="col-sm-6"> <span>'+delivery.delivery+' Delivery</span> </li>'
	                +'<li class="col-sm-3">'
                    +'<h6>'+delivery.duration+'</h6>'
                    +'</li>'
                    +'<li class="col-sm-3">'
                    +'<h5>+'+delivery.charges+'</h5>'
                    +'</li>';
					
		     $('#id_deliveryDetails').append(htmlDeliveryDetails);
			 $('#id_transaportationDetails').append(htmlTransportationDetails);
			 
			 
	 }
}

function goToPaymentMethods(){
	window.location = "PaymentMethods.html";
}

function placeOrder(){
	var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	var card = JSON.parse(localStorage.getItem('card'));
	var delivery = JSON.parse(localStorage.getItem('delivery'));
	var cart = JSON.parse(localStorage.getItem('cart'));
	
	if(currentUser == null || currentUser == 'undefined' || currentUser == ''){
		  window.location = "LoginForm.html?redirect=1";
	}else if(card != null || card != 'undefined' || card != ''){
		
		$('#id_loading').show();
		$('#id_submit').hide();
		var params = {};

        params.userid = currentUser.id;
        params.business_fk = business_id.business_id;
        params.status = 1;
        params.token = card.id;
        params.created_on = card.created;
        params.cartPrice = parseInt(localStorage.getItem('grand_total'));
        params.name = card.card.name;
        params.subtotal = parseInt(localStorage.getItem('grand_total'))-parseInt(delivery.charges),
        params.address_name = delivery.first_name +' '+delivery.last_name;
        params.mobile = delivery.phone;
        params.address = delivery.address;
        params.country = delivery.country;
        params.postalcode = delivery.zipCode;
        params.state = delivery.state;

        var token = card.id;
                    
        $.ajax({
	        type: "POST",
	        url: baseUrl + 'paybill',
	        data: params,// now data come in this function
	        crossDomain: true,
	        dataType: "json",
	        success: function (res) {
	        	var paymentID = res.payment_id;
	        	if (res.status == 200) {

                    var orderdata = {
                        'payment_id': res.payment_id,
                        'user_id': currentUser.id,
                        'business_id': business_id.business_id,
                        'items': JSON.stringify(cart),                       
                        'email': currentUser.email,
                        'firstName': currentUser.firstName,
                        'lastName': currentUser.lastName,
                        'totalPrice': parseInt(localStorage.getItem('grand_total')),
                        'deliveryCharges': delivery.charges,
                        'appname': appname,
                        'subtotal': parseInt(localStorage.getItem('grand_total'))-parseInt(delivery.charges),
                        'mobile': delivery.phone,
                        'address': delivery.address,
                        'country': delivery.country,
                        'postalcode': delivery.zipCode
                    }
                    
                    console.log(orderdata);
                    
                    $.ajax({
            	        type: "POST",
            	        url: baseUrl + 'adduserorder',
            	        data: orderdata,// now data come in this function
            	        crossDomain: true,
            	        dataType: "json",
            	        success: function (res1) {
            	        	
            	        	$.ajax({
            	    	        type: "POST",
            	    	        url: baseUrl + 'sendOrdermail',
            	    	        data: orderdata,// now data come in this function
            	    	        crossDomain: true,
            	    	        dataType: "json",
            	    	        success: function (res2) {
            	    	        	
            	    	        	if (res2.status == true) {                                 	  
                                           var orderpayment = {
                                               'business_id': business_id.business_id,
                                               'payment_id': orderdata.payment_id,
                                               'selectedStatus': "Pending",
                                               'notes': "Pending order",
                                               'customerId': currentUser.id,
                                               'customername': currentUser.firstName + ' ' + currentUser.lastName,
                                               'customeremail': currentUser.email,
                                               'items': JSON.stringify(cart),
                                               'deliveryCharges': delivery.charges,
                                               'appname': 'MobileStore',
                                               'subtotal': orderdata.subtotal,
                                               'totalPrice': orderdata.totalPrice,
                                               'mobile': delivery.phone,
                                           }
                                           console.log("orderpayment:",orderpayment);
                                            
                                           $.ajax({
                           	    	        type: "POST",
                           	    	        url: baseUrl + 'addOrderDeliveryStatus',
                           	    	        data: orderpayment,// now data come in this function
                           	    	        crossDomain: true,
                           	    	        dataType: "json",
                           	    	        success: function (res3) {
                           	    	        	                          	    	           
                           	    	        	$('#id_loading').hide();
                           	    	     	    $('#id_submit').show();
                           	    	     	    localStorage.removeItem('cart');
                           	    	     	    localStorage.removeItem('card');
                           	    	     	    localStorage.removeItem('delivery');
                          	        		     window.location = "PaymentMethod.html";
//                          	        		   window.location = "CheckoutSuccessful.html?payment="+paymentID;
                           	    	        	
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
            	        	           	        	
            	        	           	        	
            	        },error: function (jqXHR, status) {
            	            // error handler
            	            console.log(jqXHR);
            	            alert('fail' + status.code);
            	        }
            	    });
                    
	        	}else if(res.status == 400){
	        		$('#id_loading').hide();
	    	     	  $('#id_submit').show();
	        		 alert('Payment Not Done');
	        	}
	        		
	        },error: function (jqXHR, status) {
	            // error handler
	            console.log(jqXHR);
	            alert('fail' + status.code);
	        }
	 });

//        $http.post(baseURL + 'paybill', params).success(function(res, req) {
//            var items = $scope.pdetails.map(function(i) {
//                return parseFloat(i.item_price) * i.quantity;
//            });
//
//            if (res.status == 200) {
	}
}


