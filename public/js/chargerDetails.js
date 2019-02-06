//$(document).ready(function() {  
//  getCurrentUser();
    getProduct(); 
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;

//}); 
	
function getRelatedProducts(cat_id) {
	 
		$.ajax({   
	        async: true,  
	        url: baseurl + 'getPortalItemsByCategoryID/' + cat_id,  
	        method: "GET", 
	        headers: {  
	            "accept": "application/json;odata=verbose",  
	            "content-type": "application/json;odata=verbose"  
	        },
	        success: function(data) { 

	        	  $(data).each(function( index, value ) {
	        		  var item_images = value.item_image.split(',');
	        		  var htmlFloatingBanner = '<div class="owl-item" style="width: 204px; margin-right: 30px;">'
	        		                       +'<a href="product.html?product='+value.item_id+'"><div class="product product1">'
                                           +'<article style="padding: 0px;">'
                                           +'<img class="img-responsive" src="'+imageURL+'web/'+business_id.business_id+'/'+item_images[0]+'" alt="">'
                                           +'</article>'
                                           +'</div></a>'
                                           +'</div>';
	        		  
	        		  $('#id_floatingBanner').owlCarousel().trigger('add.owl.carousel', [jQuery('<div class="owl-item">' + htmlFloatingBanner + '</div>')]).trigger('refresh.owl.carousel');
	        	  });
	        	  	        	  	        	  
	        	  
	        },error: function(error) {  
	            console.log(JSON.stringify(error));  	    	  
	        }
	   });
}
	
function getProduct() {  
	  
 
	var url = window.location.href;
    var parts = url.split("?");
    if(parts.length>1){
    	
	       var urlparams = parts[1];
	       var params = urlparams.split("&");
	       var id = urlparams.split("=")
	       if (id[0]=='product') {
	    	   
	    	   
	    	   
	    	   $.ajax({   
	    	        async: true,  
	    	        url: baseurl + 'getAccessoryByID/' + id[1],  
	    	        method: "GET", 
	    	        headers: {  
	    	            "accept": "application/json;odata=verbose",  
	    	            "content-type": "application/json;odata=verbose"  
	    	        },
	    	        success: function(data) { 
	    	        		    	        	
//	    	        	localStorage.removeItem('cart');
	    	        		    	        	    	        	
	    	        	 var product={};
	    	        	     	        	 	    	        		    	        	 
	    	        	 $(data).each(function( index, value ) {
	    	        	    if ( value.item_id == id[1]){	    	        	    	
	    	        	    	product = value;
	    	        	    	    	        
	    	        	    	
		    	        	    $('#id_quantityInputParent').append('<input type="number" onchange="onChangeQty('+product.item_id+',this.value)" value="'+localStorage.getItem('quantity')+'" id="id_quantityInput">');
		 	    	        	 
			    	        	 var htmlSlider = '';
			    	        	 var htmlCarousel = '';
			    	        	 
			    	        	 product.item_image = product.item_image.split(',');
			    	        	 $(product.item_image).each(function( index, innerValue ) {
			    	        		 htmlSlider = htmlSlider + '<li><img class="imgSld" src="'+imageURL+'web/'+business_id.business_id+'/'+innerValue+'" alt="" style="width:169px;height:272px"></li>';  
			    	        		 htmlCarousel = htmlCarousel + '<li><img src="'+imageURL+'web/'+business_id.business_id+'/'+innerValue+'" alt=""></li>';
			    	        	 });
			    	        	 
			    	        	 $('#id_slider').append(htmlSlider);
			    	        	 $('#id_carousel').append(htmlCarousel);
			    	        	 			  	        	  
			    	        	 var colors = product.color.split(',');
			    	        	 var htmlColors = '';
			    	        	 localStorage.setItem('selectedColor',colors[0]);
			    	        	 $(colors).each(function( index, value ) {
			    	        		 htmlColors = htmlColors + '<span id="'+value+'" style="background:'+value+'"></span>';  	    	        		 
			    	        	 });
			    	        	 $('#id_colors').append(htmlColors);
				    	        
			    	        	 localStorage.setItem('currentCategory',product.category_id);
//			    	        	 $('#id_breadcrumCategory').append('<a href="index.html?cat='+product.category_id+'">'+product.category_name+'</a>');
			    	        	 $('#id_breadcrumCategory').append('<a href="itemlist.html?mcat_id=2?cat_id=0">Chargers</a>');
			    	        	 $('#id_breadcrumItem').append(""+product.item_name);
			    	        	 $('#id_itemName').append(""+product.item_name);
			    	        	 $('#id_itemPrice').append("$"+product.item_price);
			    	        	 var htmlGeneral = '<tr><td><b><h6>General</h6></b></td></tr>'
			    	        		 +'<tr><td><b> Sales Package</b></td><td>'+product.sales_package+'</td></tr>'
			    	        		 +'<tr><td><b> Series</b></td><td>'+product.series+'</td></tr>'
			    	        		 +'<tr><td><b> Model Number</b></td><td>'+product.model_number+'</td></tr>'
			    	        		 +'<tr><td><b> Model Name</b></td><td>'+product.model_name+'</td></tr>'
			    	        		 +'<tr><td><b> Output Interface</b></td><td>'+product.output_interface+'</td></tr>'
			    	        		 +'<tr><td><b> LED Indicator</b></td><td>'+product.led_indicator+'</td></tr>'
			    	        		 +'<tr><td><b> Designed For</b></td><td>'+product.designed_for+'</td></tr>'
			    	        	     +'<tr><td><b> Cable Length</b></td><td>'+product.cable_length+'</td></tr>';
			    	        	 $('#id_generalTable').append(htmlGeneral);
			    	        	 
			    	        	 var htmlDisplay = '<tr><td><b><h6>Power Features</h6></b></td></tr>'
			    	        		 +'<tr><td><b> Power Input</b></td><td>'+product.power_input+'</td></tr>'
			    	        		 +'<tr><td><b> Power Output</b></td><td>'+product.power_output+'</td></tr>'
			    	        		 +'<tr><td><b> Power Source</b></td><td>'+product.power_source+'</td></tr>'
			    	        		 +'<tr><td><b> Power Requirement</b></td><td>'+product.power_requirement+'</td></tr>'
			    	        		 +'<tr><td><b> Output Current</b></td><td>'+product.output_current+'</td></tr>'
			    	        		 +'<tr><td><b> Output Wattage</b></td><td>'+product.output_wattage+'</td></tr>';    	        	 
			    	        	 $('#id_displayTable').append(htmlDisplay);
			    	        	 
			    	        	 var htmlOsProcessor = '<tr><td><b><h6>Warranty</h6></b></td></tr>'
			    	        		 +'<tr><td><b> Covered in Warranty</b></td><td>'+product.covered_in_warranty+'</td></tr>'
			    	        		 +'<tr><td><b> Warranty Service Type</b></td><td>'+product.warranty_service_type+'</td></tr>'
			    	        		 +'<tr><td><b> Warranty Summary</b></td><td>'+product.warranty_summary+'</td></tr>'
			    	        	 +'<tr><td><b> Domestic Warranty</b></td><td>'+product.domestic_warranty+'</td></tr>';
			    	        	 $('#id_osProcessorTable').append(htmlOsProcessor);
			    	        				    	        	 			    	        	 
			    	        	 $('#id_screenSize').append("Wall Charger");
			    	        	 $('#id_rearCamera').append("Suitable For: Mobile");
			    	        	 $('#id_frontCamera').append("With USB Cable");
//			    	        	 $('#id_ram').append("Universal Voltage");
			    	        	 $('#id_internalMemory').append("Output Current : "+product.output_current);
//			    	        	 $('#id_availability').append(""+product.availability); 
			    	        	 
//			    	        	 getRelatedProducts(product.category_id);
	    	        	      }
	    	        	 });
	    	        	 
	    	         
	    	        if(localStorage.getItem('cart') != null && localStorage.getItem('cart') != 'undefined'){
	    	        	 var cart = JSON.parse(localStorage.getItem('cart'));
	    	        	 var isExists = false;
    	        		 $(cart).each(function( index, value ) {
    	        			 var product = value;
 	    	        	    if ( value.item_id == id[1]){
 	    	        	    	localStorage.setItem('quantity',value.quantity);
 	    	        	    	isExists = true;
 	    	        	    }
 	    	        	 });
    	        		 if(!isExists){
    	        			 localStorage.setItem('quantity','1');
    	        		 }
	    	        }else{
	    	        	localStorage.setItem('quantity','1');
	    	        	
	    	        }
	    	        
//	    	        getBusinessForAdvertise(id[1]);
	    	        
	    	        	    	        	    	             	    	        	 
	    	        	// $('#id_buyNowParent').append('<a href="ShoppingCart.html?product='+product.item_id+'" class="btn-round"><i class="icon-basket-loaded margin-right-5"></i>Buy Now</a>');
	    	       
	    	        },  
	    	        error: function(error) {  
	    	            console.log(JSON.stringify(error));  	    	  
	    	        }   
	    	    });
	       }
      }
                     
}


$('.clr').on('click', 'span', function() {
    $('.selectedColor').removeClass('selectedColor');
    $(this).addClass('selectedColor');
    localStorage.setItem('selectedColor',""+$(this).attr("id"));
});


function onChangeQty(item_id,qty){
	localStorage.setItem('quantity',qty);
	var cart = JSON.parse(localStorage.getItem('cart'));
	$(cart).each(function( index, value ) {
		if ( value.item_id == item_id){
			value.quantity = qty;
			value.total_price = parseInt(value.item_price)*parseInt(value.quantity);
		}
	});
	localStorage.setItem('cart',JSON.stringify(cart));	
}

function getBusinessForAdvertise(item_id){
	
	$.ajax({   
        async: true,  
        url: baseurl + 'getBusinessForAdvertiseByItemId/'+item_id,  
        method: "GET", 
        headers: {  
            "accept": "application/jso" + "n;odata=verbose",  
            "content-type": "application/json;odata=verbose"  
        },
        success: function(data) {
        	console.log(data);
        	var firstPosition = {};
        	var secondPosition = {};
        	var thirdPosition = {};
        	var fourthPosition = {};
        	var fifthPosition = {};
        	var positions = [];
        	
        	var htmlBuyNow = '';
        	
        	
        	
        	$(data).each(function( index, value ) {
        		 $.ajax({   
  	    	        async: false,  
  	    	        url: baseurl + 'viewbasicinfodetails/'+value.business_id,  
  	    	        method: "GET", 
  	    	        headers: {  
  	    	            "accept": "application/json;odata=verbose",  
  	    	            "content-type": "application/json;odata=verbose"  
  	    	        },
  	    	        success: function(res) {
  	    	        	
  	    	        	var image = '';
  	    	        	if(res.status == false){
  	    	        		image = imageURL + 'img/dummy_mobile_store.jpg';
  	    	        	}else{
  	    	        		
  	    	        		if(res.brandLogo == ''){
  	    	        			image = imageURL + 'img/dummy_mobile_store.jpg';
  	    	        		}else{
  	    	        			image = res.brandLogo;
  	    	        		}
  	    	        	}
  	    	        	
  	    	        	
  	    	        	value['logo'] = image;
  	    	        	
  	    	        	console.log(value);
  	    	        	if ( value.position == 'First Position'){
  		        			firstPosition = value;	        			
  		        		}
  		        		if ( value.position == 'Second Position'){
  		        			secondPosition = value;	        			
  		        		}
  		        		if ( value.position == 'Third Position'){
  		        			thirdPosition = value;
  		        			
  		        		}
  		        		if ( value.position == 'Fourth Position'){
  		        			fourthPosition = value;
  		        			
  		        		}
  		        		if ( value.position == 'Fifth Position'){
  		        			fifthPosition = value;
  		        		}
  	    	        },function(error) {  
	    	            console.log(JSON.stringify(error));  	    	  
	    	        }
        		});
        			        		        			        	     	    	        
       	    });
        	

        	
        	if(JSON.stringify(firstPosition) != '{}') {
        		positions.push(firstPosition);
        	}
        	
            if(JSON.stringify(secondPosition) != '{}') {
            	positions.push(secondPosition);        		
        	}

			if(JSON.stringify(thirdPosition) != '{}') {
				positions.push(thirdPosition);				
			}
			
            if(JSON.stringify(fourthPosition) != '{}') {
            	positions.push(fourthPosition);				
			}
            
        	if(JSON.stringify(fifthPosition) != '{}') {
        		positions.push(fifthPosition);				
			}
        	
        	console.log(positions);
        	
        	$(positions).each(function( index, value ) {

        		htmlBuyNow = htmlBuyNow + '<div class="row ">'
        		+'<div class="col-xs-12 colStyle">'
        		+'<div class="col-xs-6">'
                +'<img class="imgLogo" src="'+value.logo+'">'
                +'</div>'
                +'<div class="col-xs-6">'
                 +'<a target="_blank" href="http://'+value.host_name+'.gadgetsinasia.com/store/product.html?product='+value.business_item_id+'" class="btn  btn_success pull-right">Buy Now</a>'       		
                 +'<span class="spnrg pull-right">$'+value.item_price+'</span>'
                  +'</div>'
                   +'</div>'
                   +'</div>';
        	});
        	
        	$('#id_buyNowParent').append(htmlBuyNow);
        	
        	
        },error: function(error) {  
            console.log(JSON.stringify(error));  	    	  
        } 
	});
}


