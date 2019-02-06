//$(document).ready(function() {  
  
    getCurrentUser();
    getCategories(); 
    
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	var bussiness = bussiness;
	
  
//}); 

function getCategories() {  
	  
//	localStorage.removeItem('cart');
    $.ajax({   
        async: true,  
        url: baseurl + 'businesscategoriesbybusinessid/' + business_id.business_id,  
        method: "GET",   
        headers: {  
            "accept": "application/json;odata=verbose",  
            "content-type": "application/json;odata=verbose"  
        },  
        success: function(data) {    
        	
        	     console.log(data);       
        	     var tabsContainer = document.getElementById("tabs");
     
        	     var uList = document.getElementById("id_ul");
        	     
        	     uList.innerHTML = '';
        	     
        	     var li1="";
        	     for(var i=0;i<data.length;i++){			           
			         li1 = li1+'<li role="presentation" class=""><a href="#cat_tabs-'+data[i].category_id+'">'+data[i].category_name+'</a></li>';			        	
		         }
		          
		           uList.innerHTML = li1;
			       tabsContainer.appendChild(uList);
		          	
			       var products;
			       
			       $.ajax({   
			           async: true,  
			           url: baseurl + 'itemsbybusinessid/' + business_id.business_id, 
			           method: "GET",   
			           headers: {  
			               "accept": "application/json;odata=verbose",  
			               "content-type": "application/json;odata=verbose"  			     
			           },  
			           success: function(products) { 

			        	   products = products;
                             
			        	     var htmlTopSelling = '';
			        	     $(products).each(function( index, value ) {
			        	    	 
			        		      if(index < 10){
			        		    	  var itemImage = value.item_image[0];
			        		    	  htmlTopSelling = htmlTopSelling + '<div class="product">'
			        		            +'<a href="Product-Details.html?product='+value.item_id+'"><article> <img class="img-responsive" src="'+imageURL+'/'+itemImage+'" alt="">' 
			        		            +'<span class="tag">Mobiles</span> <a href="#" class="tittle">'+value.item_name+'</a>' 
			        		            +'<p class="rev"></p>'
			        		            +'<div class="price">$'+value.item_price+'</div>'
			        		            +'<a href="Product-Details.html?product='+value.item_id+'" class="cart-btn"><i class="icon-basket-loaded"></i>'
			        		            +'</a> </article></a>'
			        		            +'</div>';
			        		      }
			        		   
			        	     });
			        	     
			        	     $('#id_topSelling').append(htmlTopSelling);
			        	   
			        	     for(var i=0;i<data.length;i++){
			        	    	 data[i]['products'] = [];
			        	    	 for(var j=0;j<products.length;j++){
				        	    	 if(products[j].category_id == data[i].category_id){
				        	    		 data[i]['products'].push(products[j]);
				        	    	 }
				        	     }
			        	     }
			        	     
                             var tabContent = document.createElement("div");
          		              tabContent.id='id_tab_content';
          		                    		              
          		 		        for(var i=0;i<data.length;i++){ 
          		 		        	
	          		 		        if(data[i].products.length > 0){
	          		 		        	var t1 = document.createElement("div");
	          		 		        	t1.id = "cat_tabs-"+data[i].category_id;
	         		 		        	 var innerHTML = '<div class="item-col-5">';
	         		 		        	 		        	 		        	 
	         		 		        	  for(var j=0;j<data[i].products.length;j++){
	
	         		 		        		    var itemImage = data[i].products[j].item_image[0];
	         		 				        	innerHTML = innerHTML + '<div class="product"><a href="Product-Details.html?product='+data[i].products[j].item_id+'"><article> <img class="img-responsive" src="'+imageURL+'/'+itemImage+'" alt="">' 
	         		 							              +'<span class="tag">Phones</span> <a href="Product-Details.html?product='+data[i].products[j].item_id+'" class="tittle">'+data[i].products[j].item_name+' </a>'
	         		 							              +'<p class="rev"></p>'
	         		 							              +'<div class="price">$'+data[i].products[j].item_price+'</div>'
	         		 							              +'<a href="Product-Details.html?product='+data[i].products[j].item_id+'" class="cart-btn"><i class="icon-basket-loaded"></i></a> </article></a></div>';
	         		 				       }
	         		 		        	 
	         		 		        	 
	         		 		        	 innerHTML = innerHTML+'</div>';		 		        	 
	         		 		        	 t1.innerHTML = innerHTML;
	         		 		        	 tabContent.appendChild(t1);
	          		 		        }else{
	          		 		        	var t1 = document.createElement("div");
	          		 		        	 t1.id = "cat_tabs-"+data[i].category_id;
	         		 		        	 var innerHTML = '<div class="item-col-5"><h5>Items not available</h5></div>';	         		 		        	 	 		        	 
	         		 		        	 t1.innerHTML = innerHTML;
	         		 		        	 tabContent.appendChild(t1);
	          		 		        }
          		 		        	 		        	 
          		 		        	 
          		 		        }
          		 		        
          		 		       tabsContainer.appendChild(tabContent);
          		    	     	          			       			       		
          		               $( "#tabs" ).tabs();
          		               
          		               var url = window.location.href;
	          		           var parts = url.split("?");
	          		           console.log(parts);
	          		           if(parts.length>1){
	          		           	
	          		       	       var urlparams = parts[1];
	          		       	       var params = urlparams.split("&");
	          		       	       var id = urlparams.split("=");
	          		       	       if (id[0]=='cat') {
	          		       	    	   $('a[href="#cat_tabs-'+id[1]+'"]').click();
	          		       	       }
	          		       	       
	          		           }else{
	          		        	   var catId = localStorage.getItem('currentCategory');
	          		        	   $('a[href="#cat_tabs-'+catId+'"]').click();
	          		           }
			              
			           },  
			           error: function(error) {  
			               console.log(JSON.stringify(error));  
			     
			           }  			     
			       });			                                   
           
        },  
        error: function(error) {  
            console.log(JSON.stringify(error));  
  
        }  
  
    })   
}


$('.nav-list').on('click', 'li', function() {
    $('.nav-list li.active').removeClass('active');

    $(this).addClass('active');
});