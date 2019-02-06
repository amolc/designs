//$(document).ready(function() {  
  
//    getCategories(); 
 getCurrentUser();    
var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	
	var appname = appname;
	
	$('#id_loading').hide();
	$('#id_submit').show();

//});
	
	// Stripe.setPublishableKey('pk_live_jkyEOI3O4ab2LXdgIevpM0Yz');
    Stripe.setPublishableKey('pk_test_f4AmpyV2vuql0QPEb2WHIQRo');
       
    
    $(document).ready(function() {
        function addInputNames() {
            $(".card-number").attr("name", "card-number")
            $(".card-cvc").attr("name", "card-cvc")
            $(".card-expiry-year").attr("name", "card-expiry-year")
        }
        function removeInputNames() {
            $(".card-number").removeAttr("name")
            $(".card-cvc").removeAttr("name")
            $(".card-expiry-year").removeAttr("name")
        }
        function submit(form) {
            removeInputNames(); 
            // given a valid form, submit the payment details to stripe
            $(form['submit-button']).attr("disabled", "disabled")
            Stripe.createToken({            	
                name: $('.card-name').val(),
                number: $('.card-number').val(),
                cvc: $('.card-cvc').val(),
                exp_month: $('.card-expiry-month').val(), 
                exp_year: $('.card-expiry-year').val()
            }, function(status, response) {
                if (response.error) {
                  
                    $(form['submit-button']).removeAttr("disabled")
                    $(".payment-errors").html(response.error.message);
                    addInputNames();
                } else {
                    var token = response['id'];
                    localStorage.setItem('card',JSON.stringify(response));
                    placeOrder();
                }
            });
            
            return false;
        }

        jQuery.validator.addMethod("cardNumber", Stripe.validateCardNumber, "Please enter a valid card number");
        jQuery.validator.addMethod("cardCVC", Stripe.validateCVC, "Please enter a valid security code");
        jQuery.validator.addMethod("cardExpiry", function() {
            return Stripe.validateExpiry($(".card-expiry-month").val(), 
                                         $(".card-expiry-year").val())
        }, "Please enter a valid expiration");
        
        $("#example-form").validate({
            submitHandler: submit,
            rules: {
                "card-cvc" : {
                    cardCVC: true,
                    required: true
                },
                "card-number" : {
                    cardNumber: true,
                    required: true
                },
                "card-expiry-year" : "cardExpiry" // we don't validate month separately
            }
        });                
        addInputNames();
        
    });
    
    
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
                                                   'appname': 'MobileStore ',
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
//                              	        		     window.location = "PaymentMethod.html";
                              	        		   window.location = "CheckoutSuccessful.html?payment="+paymentID;
                               	    	        	
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

//            $http.post(baseURL + 'paybill', params).success(function(res, req) {
//                var items = $scope.pdetails.map(function(i) {
//                    return parseFloat(i.item_price) * i.quantity;
//                });
    //
//                if (res.status == 200) {
    	}
    }
