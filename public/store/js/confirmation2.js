//$(document).ready(function() {  
  
    getCurrentUser();
    updateCartDetails(); 
    getBusinessDetails();
//    updateCardDetails();
//    updateDeliveryDetails();
    var business_id = business_id;
    var appname = appname;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	
	$('#id_loading').hide();
	$('#id_submit').show();
	 
//}); 
function getBusinessDetails()
{
	
	$.ajax({   
		        async: true,  
		        url: baseurl + 'businessinfo/' + business_id.business_id,  
		        method: "GET",   
		        headers: {  
		            "accept": "application/json;odata=verbose",  
		            "content-type": "application/json;odata=verbose"  
		        },  
		        success: function(data) {
		        	
//		        	$('#id_headerCategories').html('');
		        	var htmlDeliveryDetails = '';
		        	$(data).each(function( index, value ) {
		        		htmlDeliveryDetails = '<li class="col-sm-12">'
//		  	              +'<h6>Name</h6>'
		  	              +'<span>'+value.business_name+'</span><br>'
		  	              +'<span>'+value.business_address+'</span><br>'
		  	              +'<span>Email:'+value.email_id+'</span><br>'
		  	              +'<span>Tel:'+value.business_mobileNumber+'</span></li>';
//		  	              +'<li class="col-sm-12">'
//		  	              +'<h6>Email</h6>'
//		  	              +'<span>'+value.email_id+'</span> </li>'
//		  	              +'<li class="col-sm-12">'
//		  	              +'<h6>Phone</h6>'
//		  	              +'<span>'+value.business_mobileNumber+'</span> </li>';
//		  	              +'<li class="col-sm-12">'
//		  	              +'<h6>Address</h6>'
		  	              
		        	});
		        	$('#id_deliveryDetails').append(htmlDeliveryDetails);
		        	
//		        	$('#id_headerCategories').append(htmlHeaderCategories);
		        }
	     });
}
function updateCartDetails(){
		 var cart = JSON.parse(localStorage.getItem('cart'));
		 var delivery = JSON.parse(localStorage.getItem('delivery'));
		 if(cart != null && cart != ''){
			     $('#id_grandTotal').html('');
			     $('#id_discount').html('');
			     $('#id_coupon').html('');
			     
				 var htmlCartDetails = "";
				 var grandTotal=0;
				 var subTotal=0;
				 $(cart).each(function( index, value ) {
					 grandTotal = grandTotal + parseInt(value.total_price);
					 htmlCartDetails = htmlCartDetails + '<ul class="row check-item">'
			            
					 	+'<li class="col-xs-3">'
			            +'<img class="img-responsive" src="'+imageURL+'/'+value.item_image[0]+'" alt="">'
			            +'</li>'
			            +'<li class="col-xs-3">'
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
				 if(localStorage.getItem('coupon_code')!=null)
				 {
					 subTotal=grandTotal;
					 var discount=subTotal-localStorage.getItem('grand_total');
					 var htmlSubTotal ='<ul class="row check-item">'
			            +'<li class="col-xs-3">'
//			            +'<img class="img-responsive" src="'+imageURL+'/'+value.item_image[0]+'" alt="">'
			            +'</li>'
			            +'<li class="col-xs-3">'
//			            +'<p>'+value.item_name+'</p>'
			            +'</li>'
			            +'<li class="col-xs-2 text-center">'
//			            +'<p>$'+value.item_price+'</p>'
			            +'</li>'
			            +'<li class="col-xs-2 text-center">'
			            +'<p>Sub Total</p>'
			            +'</li>'
			            +'<li class="col-xs-2 text-center">'
			            +'<p>$'+subTotal+'</p>'
			            +'</li>'
			            +'</ul>';
					 var htmlGrandTotal ='<ul class="row check-item">'
				            +'<li class="col-xs-3">'
//				            +'<img class="img-responsive" src="'+imageURL+'/'+value.item_image[0]+'" alt="">'
				            +'</li>'
				            +'<li class="col-xs-3">'
//				            +'<p>'+value.item_name+'</p>'
				            +'</li>'
				            +'<li class="col-xs-2 text-center">'
//				            +'<p>$'+value.item_price+'</p>'
				            +'</li>'
				            +'<li class="col-xs-2 text-center">'
				            +'<p>Total Price</p>'
				            +'</li>'
				            +'<li class="col-xs-2 text-center">'
				            +'<p>$'+grandTotal+'</p>'
				            +'</li>'
				            +'</ul>';
					 var htmlDiscountTotal ='<ul class="row check-item">'
				            +'<li class="col-xs-3">'
//				            +'<img class="img-responsive" src="'+imageURL+'/'+value.item_image[0]+'" alt="">'
				            +'</li>'
				            +'<li class="col-xs-3">'
//				            +'<p>'+value.item_name+'</p>'
				            +'</li>'
				            +'<li class="col-xs-2 text-center">'
//				            +'<p>$'+value.item_price+'</p>'
				            +'</li>'
				            +'<li class="col-xs-2 text-center">'
				            +'<p>Discount</p>'
				            +'</li>'
				            +'<li class="col-xs-2 text-center">'
				            +'<p>$'+discount+'</p>'
				            +'</li>'
				            +'</ul>';
					 grandTotal=subTotal-discount;
					 $('#id_grandTotal').append(htmlGrandTotal);
					 $('#id_subtotal').append(htmlSubTotal);
					 $('#id_discount').append(htmlDiscountTotal);
				 }
				 else
				 {
					 var htmlSubTotal ='<ul class="row check-item">'
			            +'<li class="col-xs-3">'
//			            +'<img class="img-responsive" src="'+imageURL+'/'+value.item_image[0]+'" alt="">'
			            +'</li>'
			            +'<li class="col-xs-3">'
//			            +'<p>'+value.item_name+'</p>'
			            +'</li>'
			            +'<li class="col-xs-2 text-center">'
//			            +'<p>$'+value.item_price+'</p>'
			            +'</li>'
			            +'<li class="col-xs-2 text-center">'
//			            +'<p>'+value.quantity+' Items</p>'
			            +'</li>'
			            +'<li class="col-xs-2 text-center">'
			            +'<p>$'+grandTotal+'</p>'
			            +'</li>'
			            +'</ul>';
					 var htmlGrandTotal ='<ul class="row check-item">'
				            +'<li class="col-xs-3">'
//				            +'<img class="img-responsive" src="'+imageURL+'/'+value.item_image[0]+'" alt="">'
				            +'</li>'
				            +'<li class="col-xs-3">'
//				            +'<p>'+value.item_name+'</p>'
				            +'</li>'
				            +'<li class="col-xs-2 text-center">'
//				            +'<p>$'+value.item_price+'</p>'
				            +'</li>'
				            +'<li class="col-xs-2 text-center">'
				            +'<p>Total Price</p>'
				            +'</li>'
				            +'<li class="col-xs-2 text-center">'
				            +'<p>$'+grandTotal+'</p>'
				            +'</li>'
				            +'</ul>';
					 var htmlDiscountTotal ='<ul class="row check-item">'
						 	
						 	+'<li class="col-xs-3">'
				            +'</li>'
				            +'<li class="col-xs-3">'
				            +'</li>'
				            +'<li class="col-xs-2 text-center">'
				            +'</li>'
				            +'<li class="col-xs-2 text-center">'
				            +'<p>Total Price</p>'
				            +'</li>'
				            +'<li class="col-xs-2 text-center">'
				            +'<p>$ 0 </p>'
				            +'</li>'
				            +'</ul>';
					 $('#id_grandTotal').append(htmlGrandTotal);
					 $('#id_subtotal').append(htmlSubTotal);
					 $('#id_discount').append(htmlDiscountTotal);
					 localStorage.setItem('grand_total',grandTotal);
					 
				 }
				 
		 }
}

function goToPaymentMethods1(){
	window.location = "PaymentMethods.html";
}

function goToPaymentMethods(){
	var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	var card = localStorage.getItem('card');
//	var delivery = JSON.parse(localStorage.getItem('delivery'));
	var cart =localStorage.getItem('cart');
	
	if(currentUser == null || currentUser == 'undefined' || currentUser == ''){
		  window.location = "LoginForm.html?redirect=1";
	}else if(card != null || card != 'undefined' || card != ''){
		
		$('#id_loading').show();
		$('#id_submit').hide();
		var params = {};

        params.userid = currentUser.id;
        params.business_id = business_id.business_id;
        params.cart = cart;
        params.cartPrice = parseInt(localStorage.getItem('grand_total'));
        params.sub_total = parseInt(localStorage.getItem('sub_total'));
        if(localStorage.getItem('coupon_code')!=null)
        {
        	params.coupon_id = parseInt(localStorage.getItem('coupon_id'));
        }
        
        $.ajax({
	        type: "POST",
	        url: baseUrl + 'orderMobile',
	        data: params,// now data come in this function
	        crossDomain: true,
	        dataType: "json",
	        success: function (res) {
	        	if (res.status == 200) {
	        		
	    	     	    localStorage.removeItem('cart');
	        		     window.location = "Invoice2.html?OrderId="+res.order_id+"";
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
	}
}


