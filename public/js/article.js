//$(document).ready(function() {  

//    getCurrentUser();
    //getLatestGadgets();
  //  getProductList();
  
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	var hostname = document.location.hostname;
	
	var pagedItems = [];

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
	
	
function getProductList(){   	   
	var url = window.location.href;
    var parts = url.split("?");
    console.log(parts);
    if(parts.length>0){
		var urlparams = parts[1];
		console.log(urlparams);
	   var params = urlparams.split("&");
	   
       var id = params[0].split("=")
       if (id[0]=='id') {
	    
	    	$.ajax({   
	  	      async: true,  
	  	      url: baseurl + 'getFeaturedItemByID/'+id[1],  
	  	      method: "GET",   
	  	      headers: {  
	  	          "accept": "application/json;odata=verbose",  
	  	          "content-type": "application/json;odata=verbose"  
	  	      },  
	  	      success: function(res) {
	  	
                  $('#id_itemName').html(res[0].item_name);
                
                  var date = new Date(res[0].create_at);                  
	    		  var locale = "en-us",
	    		  month = date.toLocaleString(locale, { month: "short" });
	    		  
	    		  var htmlItemDetails = '<div class="classRowPaddingTop" style="padding-bottom:4%;padding-right: 19px;">'
                  
                  +'<div class="row classItemListRow arti">'
//      	         +'<div class="col-md-3 classProductImgParent" align="center">'
//                  +'<img class="classProductImage" src="'+imageURL+'web/'+business_id.business_id+'/'+res[0].item_image+'">'
//      	         +'</div>'
      	         +'<div class="col-md-12">'
                  +'<p class="discp">'+res[0].detailed_description+'</p>'
                  +'<div class="row" style="padding-right: 27px;padding-top: 17px;">'
                  +'<p class="authorNameColor authorAlign" style="float: right;">'+res[0].author_name+'<span> '+date.getDate()+' '+month+' '+date.getFullYear()+'</span></p>'
                  +'<img class="img-responsive" src="'+imageURL+'img/'+res[0].author_pic+'" style="width: 30px;border-radius: 50%;float: right;">'                  
                  +'</div>'
      	         +'</div>'
      	       
                  +'</div>'                 
                  +'</div>';
	    		  
//                  var htmlItemDetails = '<div class="col-md-12 boxp" style="padding: 32px;border: 1px solid #d6d4d4;">'
//                                      +'<div class="col-md-3">'
//                                      +'<img class="imgF" src="'+imageURL+'web/'+business_id.business_id+'/'+res[0].item_image+'">'
//                                      +'</div>'
//                                      +'<div class="col-md-9">'
//                                      +'<h6 class="prodF"></h6>'
//                                      +'<p class="Fdecp">'+res[0].detailed_description+'</p>'                                      
//                                      +'</div>'
//                                      +'<div class="col-md-12">'
//                                      +'<div class="comment-user" style="float:right;width:auto">'                                      
//                                      +'<img class="img-responsive" src="'+imageURL+'img/'+res[0].author_pic+'" style="width: 30px;border-radius: 50%;">'
//                                      +'<span class="">'+res[0].author_name+',</span>'
//                                      +'<time class="comment-date" datetime="16-12-2014 01:05" style="padding-left: 7px;">'
//									  +'<i class="fa fa-clock-o"></i>'+date.getDate()+' '+month+' '+date.getFullYear()+'</time>'
//                                      +'</div>'
//                                      +'</div>'
//                                      +'</div>';
                                                                                                                             
                  $('#id_itemDetailsParent').html(htmlItemDetails);
                  $('#id_itemName').html(res[0].item_name);
                  $('#id_breadcrumb').html(res[0].item_name);
                  
	  	    	  
	  	      },error: function(error) {  
	              console.log(JSON.stringify(error));    
	          }  	    
	       }); 
	    	
       }
	     
    }
    
    
}




