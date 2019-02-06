//$(document).ready(function() {  

//    getCurrentUser();
//    getCategories();
//    getLatestGadgets();
//    getFeaturedItems();
//    getPortalNews();
    
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	var hostname = document.location.hostname;
	
//}); 
	
	function getLatestGadgets(){
		$.ajax({   
		      async: true,  
		      url: baseurl + 'getPortalLatestItems',  
		      method: "GET",   
		      headers: {  
		          "accept": "application/json;odata=verbose",  
		          "content-type": "application/json;odata=verbose"  
		      },  
		      success: function(res) { 
		    	   
		    	   var latestGadgetsHtml = '';
		    	   $(res).each(function( index, value ) {
		    		   latestGadgetsHtml = latestGadgetsHtml + '<div class="classRowPaddingTop" >'
		    		                      +'<div class="classProductImgParent classLatestGadgets" align="center">'
		                                  +'<a href="product.html?product='+value.item_id+'"><img class="classProductImage" src="'+imageURL+'web/'+business_id.business_id+'/'+value.item_image+'"></a>'
		                                  +'</div>'
		                                  +'<a href="product.html?product='+value.item_id+'">'
		                                  +'<h5 class="rightHeader hLineH">'+value.item_name+'</h5></a>'
		                                  +'<p class="firstCaps">'+value.item_description+'</p>'		                                 
						                  +'</div>';   
		    	   });
		    	   
		    	
		    	   $('#id_latestGadgets').append(latestGadgetsHtml);
		      },error: function(error) {  
		            console.log(JSON.stringify(error));    
		      }  	  
		});   
	}
	
	function getPortalNews(){
		 $.ajax({   
		      async: true,  
		      url: baseurl + 'getPortalNews',  
		      method: "GET",   
		      headers: {  
		          "accept": "application/json;odata=verbose",  
		          "content-type": "application/json;odata=verbose"  
		      },  
		      success: function(res) { 
		    	   
		    	   console.log(res);
		    	   var newsHtml = "";
		    	   
		    	   $(res).each(function( index, value ) {
		    		   var date = new Date(value.create_at*1000);
		    		   var locale = "en-us",
		    		   month = date.toLocaleString(locale, { month: "short" });
		    		   
		    		   newsHtml = newsHtml + '<div class="col-md-6 texJust">'
                     		               +'<h5 class="leftHeader">'+value.title+'</h5>'
                                           +'<p class=" " >'+value.description+'</p>'
                     	                   +'</div>'
                     	                   +'<div class="col-md-2"></div>';
		    		   
//		    		              '<div class="col-md-12 newsS">'
//		                          +'<div class="media">'
//		                          +'<div class="media-body">'
//		                          +'<a class="app1" href="#">'
//		                          +'<i class="fa fa-star" aria-hidden="true" style="padding-right: 4px;"></i>'
//		                          +value.title+'</a>' 
//		                          +'<p>'+value.description+'</p>'
//		                          +'<span>'+date.getDate()+' '+month+' '+date.getFullYear()+'</span>'
//		                          +'</div>'
//		                          +'</div>'
//		                          +'</div>';
		    	   });
		    	   
		    	   $('#id_news').html(newsHtml);
		    	   		    	  		    	   		         
		      },error: function(error) {  
		            console.log(JSON.stringify(error));    
		      }  	  
		});   
  }
	
function getFeaturedItems(){
	 $.ajax({   
	      async: true,  
	      url: baseurl + 'getFeaturedItems',  
	      method: "GET",   
	      headers: {  
	          "accept": "application/json;odata=verbose",  
	          "content-type": "application/json;odata=verbose"  
	      },  
	      success: function(res) { 
	    	   
	    	   console.log(res);
	    	   var featuredItemHtml = "";
	    	   
	    	   $(res).each(function( index, value ) {
	    		   var item_name = value.item_name.replace(/ /g, "-");
	    		   featuredItemHtml = featuredItemHtml + '<div class="classRowPaddingTop" style="padding-bottom:4%">'
	                                 +'<a href="article.html?id='+value.item_id+'&name='+item_name+'">'
	                                 +'<h5 class="leftHeader hLineH">'+value.item_name+'</h5></a>'
	                                 +'<p class="authorNameColor">'+value.author_name+'<span> 28 May 2018</span></p>'
	                                 +'<div class="row classItemListRow">'
	                     	         +'<div class="col-md-3 classProductImgParent" align="center">'
	                                 +'<a href="article.html?id='+value.item_id+'&name='+item_name+'">'
	                                 +'<img class="classProductImage" src="'+imageURL+'web/'+business_id.business_id+'/'+value.item_image+'" alt="'+value.item_name+'" title="'+value.item_name+'">'
	                                 +'</a>'
	                     	         +'</div>'
	                     	         +'<div class="col-md-9">'
	                                 +'<p class="discp">'+value.item_description+'</p>'
	                                 +'<a href="article.html?id='+value.item_id+'&name='+item_name+'" class="discp" style="color:blue">Read More</a>'
	                     	         +'</div>'
	                                 +'</div>'
	                                 +'</div>';
	    		   
//	    		                        '<a href="article.html?'+value.item_id+'?'+item_name+'"><div class="col-md-12 boxp">'
//		                                 +'<div class="col-md-3">'
//	                                     +'<img class="imgF" src="'+imageURL+'web/'+business_id.business_id+'/'+value.item_image+'">'
//		                                 +'</div>'
//		                                 +'<div class="col-md-9">'
//		                                 +'<h6 class="prodF">'+value.item_name+'</h6>'
//		                                 +'<p class="Fdecp">iPhone 8 introduces an allâ€‘new glass design. The worldâ€™s most popular camera, now even better. The most powerful and smartest chip ever in a smartphone. Wireless charging thatâ€™s truly effortless. And augmented reality experiences never before possible. iPhone 8. A new generation of iPhone.</p>'
//		                                 +'<p class="priceF">$ 1200</p>'
//		                                 +'</div>'
//		                                 +'</div></a>';
	    	   });
	    	   
	    	   $('#id_featuredItems').html(featuredItemHtml);
	    	   
	    	   
	    	   
	         
	      },error: function(error) {  
	            console.log(JSON.stringify(error));    
	      }  	  
	});   
}



function getCategories() {  

    $.ajax({   
        async: true,  
        url: baseurl + 'categoriesbybusinessid/' + business_id.business_id,  
        method: "GET",   
        headers: {  
            "accept": "application/json;odata=verbose",  
            "content-type": "application/json;odata=verbose"  
        },  
        success: function(data) { 
        	     var li1="";
        	     var mobileCategoryHtml = '';
        	     for(var i=0;i<data.length;i++){			           
			        	li1 = li1+'<li role="presentation" class=""><a href="#cat_tabs-'+data[i].category_id+'">'+data[i].category_name+'</a></li>';			        	
			        	mobileCategoryHtml = mobileCategoryHtml+'<li><a href="itemlist.html?mcat_id=1?cat_id='+data[i].category_id+'">'+data[i].category_name+'</a></li>'
        	     }
        	     
        	     $('#id_mobileCategories').html(mobileCategoryHtml);

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



