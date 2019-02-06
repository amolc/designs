//$(document).ready(function() {  

   getCurrentUser();
    getCart(); 
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	 $('#content').show();
	 $('#content-empty').hide();
	 
//}); 

 function guid() {

	    var nav = window.navigator;
	    var screen = window.screen;
	    var guid = nav.mimeTypes.length;
	    guid += nav.userAgent.replace(/\D+/g, '');
	    guid += nav.plugins.length;
	    guid += screen.height || '';
	    guid += screen.width || '';
	    guid += screen.pixelDepth || '';

	    return guid;
};
	
function applyCart()
{
	if(($('#promocode').val() =='undefined' || $('#promocode').val() =='')){     
		$("#errormessage").text('Promocode Required');
		$("#errormessage").show('slow');
	}else{
 	 
 	 var data = {
			code: $('#promocode').val(),
		};
	 $.ajax({
	        type: "POST",
	        url: baseUrl+"applypromocode",
	        data: data,// now data come in this function
	        crossDomain: true,
	        dataType: "json",
	        success: function (data) {
	        	console.log(data);
	        	if(data.status==true)
	        	{
	        		var grandTotal=(parseInt(localStorage.getItem('sub_total'))-data.record[0].value);
	        		 $('#id_grandTotal').html('');
	        		 $('#id_subtotal').html('');
	        		 $('#id_coupon').html('');
	        		$('#id_grandTotal').append("$"+grandTotal);
	        		$('#id_subtotal').append("$"+localStorage.getItem('sub_total'));
	        		$('#id_coupon').append("$"+data.record[0].value);
	        		$("#successmessage").text(data.message);
	        		$("#successmessage").show('slow');
	        		$("#errormessage").hide('slow');
	        		localStorage.setItem('coupon_code',data.record[0].code);
	        		localStorage.setItem('coupon_id',data.record[0].id);
	        		localStorage.setItem('grand_total',grandTotal);
					localStorage.setItem('sub_total',localStorage.getItem('sub_total'));
	        	}
	        	else
	        	{
	        		var grandTotal=(parseInt(localStorage.getItem('sub_total')));
	        		 $('#id_grandTotal').html('');
	        		 $('#id_subtotal').html('');
	        		 $('#id_coupon').html('');
	        		$('#id_grandTotal').append("$"+grandTotal);
	        		$('#id_subtotal').append("$"+localStorage.getItem('sub_total'));
	        		$('#id_coupon').append("$0");
	        		
	        		$("#successmessage").hide('slow');
	        		localStorage.removeItem('coupon_code');
	        		localStorage.setItem('grand_total',grandTotal);
					localStorage.setItem('sub_total',localStorage.getItem('sub_total'));
	        		$("#errormessage").text(data.message);
	        		$("#errormessage").show('slow');
	        	}
	       
	        },error: function (jqXHR, status) {
	            // error handler
	            console.log(jqXHR);
	            alert('fail' + status.code);
	        }
	 });
	}
}
function getCart() {  
	  
	var url = window.location.href;
    var parts = url.split("?");
    if(parts.length>1){
    	
	       var urlparams = parts[1];
	       var params = urlparams.split("&");
	       var id = urlparams.split("=")
	       if (id[0]=='product') {
	    	   $.ajax({      
	    	        async: true,  
	    	        url: baseurl + 'itemsbybusinessid/' + business_id.business_id,  
	    	        method: "GET", 
	    	        headers: {  
	    	            "accept": "application/json;odata=verbose",  
	    	            "content-type": "application/json;odata=verbose"  
	    	        },
	    	        success: function(data) { 
                      
	    	          if(id[1] != 0){
	    	        	  	    	          
		    	        	 if(localStorage.getItem('cart') == null || localStorage.getItem('cart') == '' ||
		    	                 localStorage.getItem('cart') == 'null' || localStorage.getItem('cart') == 'undefined'){
		    	        		 
		    	        		 var cart = [];
		    	        		 $(data).each(function( index, value ) {
		    	        			 var product = value;
		 	    	        	    if ( value.item_id == id[1]){
		 	    	        	    	
		 	    	        	    	product['local_id'] = guid();
		 	    	        	    	//product['cart_id'] = guid();
		 	    	        	    	product['quantity'] = localStorage.getItem('quantity');
		 	    	        	    	product['selectedColor'] = localStorage.getItem('selectedColor');
		 	    	        	    	product['total_price'] = parseInt(product['item_price'])*parseInt(product['quantity']);
		 	    	        	    	cart.push(product);
		 		    	        		localStorage.setItem('cart',JSON.stringify(cart));
		 	    	        	    }	    	        	    	
		 	    	        	    		    	        	    
		 	    	        	 });
		    	        		 	    	        		 	    	        		 
		    	        	 }else{
		    	        		
		    	        		 var cart = JSON.parse(localStorage.getItem('cart'));
			    	        		 var isExists = false;
			    	        		 $(cart).each(function( index, value ) {		    	        			
				 	    	        	    if ( value.item_id == id[1]){
				 	    	        	    	console.log('outer');
				 	    	        	    	isExists = true;	 	    	        	    		 	    	        	    		 	    	        	    	
				 	    	        	    }	 	    	        	    	 	    	        	    
			 	    	        	 });
			    	        		 
			    	        		 if(!isExists){
		 	    	        	    	
		 	    	        	    	$(data).each(function( index, innerValue ) {
		 		    	        			var innerProduct = innerValue;
		 		 	    	        	    if ( innerValue.item_id == id[1]){
		 		 	    	        	    	
		 		 	    	        	    	innerProduct['local_id'] = guid();
		 		 	    	        	    	innerProduct['quantity'] = localStorage.getItem('quantity');
		 		 	    	        	    	innerProduct['selectedColor'] = localStorage.getItem('selectedColor');
		 		 	    	        	    	innerProduct['total_price'] = parseInt(innerProduct['item_price'])*parseInt(innerProduct['quantity']);
		 		 	    	        	        cart.push(innerProduct);
		 		 	    	        	        localStorage.setItem('cart',JSON.stringify(cart));
		 		 	    	        	    }
		 		 	    	        	 });	 	    	        	    	
		 	    	        	     }
		    	        	 } 
	    	        	 
	    	          }
	    	        	 
	    	        	 updateCart();
	    	        	 
	    	       
	    	        },  
	    	        error: function(error) {  
	    	            console.log(JSON.stringify(error));  	    	  
	    	        }   
	    	    });
	       }
      }
                     
}

function updateCart(){
		 var cart = JSON.parse(localStorage.getItem('cart'));
		 if(cart != null && cart != ''){
			     $('#id_cartTable').html('');
			     $('#id_grandTotal').html('');
			     $('#id_subtotal').html('');
			     $('#id_coupon').html('');
				 var htmlCartTable = "";
				 var grandTotal = 0;
				 $(cart).each(function( index, value ) {
					 grandTotal = grandTotal + parseInt(value.total_price);
					 htmlCartTable = htmlCartTable + '<tr><td><div class="media">'
		             +'<div class="media-left"> <a href="#."> <img class="img-responsive" src="'+imageURL+'/'+value.item_image[0]+'" alt="">'
		             +'</a></div><div class="media-body"><p>'+value.item_name+'</p>'
		             +'</div></div></td><td class="text-center padding-top-60">$'+value.item_price+'</td>'
		             +'<td class="text-center"><div class="quinty padding-top-20">'
		             +'<input type="number" value="'+value.quantity+'" id="id_cartQuantity" onchange="onChangeQty('+value.item_id+',this.value)"></div></td>'
		             +'<td class="text-center padding-top-60" id="id_cartItemTotalPrice">$'+value.total_price+'</td>'
		             +'<td class="text-center padding-top-60"><a href="#" onclick="onRemoveFromCart('+value.item_id+')" class="remove"><i class="fa fa-close"></i>'
		             +'</a></td></tr>';
		    	 });				 
				 $('#id_cartTable').append(htmlCartTable);
				 $('#id_grandTotal').append("$"+grandTotal);
				 $('#id_subtotal').append("$"+grandTotal);
				 $('#id_coupon').append("$ 0");
				 localStorage.setItem('grand_total',grandTotal);
				 localStorage.setItem('sub_total',grandTotal);
		 }
		 else
		 {
			 $('#content-empty').show();
			 var empty_cart='<section>'
                  +'<div class="container">'  
                  +'<div class="order-success">'
			 	  +'<i class="fa fa-times"></i>'
			 	  +'<h6>Your cart is empty</h6>'
			 	  +'<p>Aenean dui mi, tempus non volutpat eget, molestie a orci. Nullam eget sem et eros laoreet rutrum. Quisque sem ante, feugiat quis lorem in.</p>'
			 	  +'<a href="index.html" class="btn-round">Return to Shop</a>'
			 	  +'</div>'
			 	  +'</div>'
			 	  +'</section>';
			 $('#content-empty').append(empty_cart);
			 $('#content').hide();
			 
		 }
}

function onChangeQty(item_id,qty){
	var cart = JSON.parse(localStorage.getItem('cart'));
	$(cart).each(function( index, value ) {
		if ( value.item_id == item_id){
			value.quantity = qty;
			value.total_price = parseInt(value.item_price)*parseInt(value.quantity);
		}
	});
	localStorage.setItem('cart',JSON.stringify(cart));
	updateCart();	
}

function onRemoveFromCart(item_id){
	var cart = JSON.parse(localStorage.getItem('cart'));
	$(cart).each(function( index, value ) {
		if ( value.item_id == item_id){
			cart.splice(index,1);
		}
	});
	localStorage.setItem('cart',JSON.stringify(cart));
	updateCart();
}

function onGoDeliveryMethods(){
//	var currentUser = JSON.parse(localStorage.getItem('currentUser'));
//	if(currentUser == null || currentUser == 'undefined' || currentUser == ''){
//		  window.location = "LoginForm.html?redirect=1";
//	}else{
		  window.location = "Confirmation.html";
//	}
}

