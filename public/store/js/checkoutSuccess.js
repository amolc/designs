//$(document).ready(function() {  
  
    getCurrentUser();
    
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;

  
//}); 

	
	
 function onGetInvoice(){
	 var url = window.location.href;
	    var parts = url.split("?");
	    if(parts.length>1){	    	
		       var urlparams = parts[1];
		       var params = urlparams.split("&");
		       var id = urlparams.split("=")
		       if (id[0]=='payment') {
		    	   window.location = 'Invoice2.html?OrderId='+id[1];
		       }
	    }
	 
 }

	

