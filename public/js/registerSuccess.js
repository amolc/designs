//$(document).ready(function() {  
  
//    getCurrentUser();
    
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;

	var url = window.location.href;
    var parts = url.split("?");
    if(parts.length>1){
    	   
	       var urlparams = parts[1];
	       var params = urlparams.split("&");
	       var id = urlparams.split("=")
	       if (id[0]=='host') {
//	    	   var url = 'http://'+id[1]+'.gadgetsinasia/store';
	    	   //var url = 'http://priya.gadgetsinasia/store';
			   //var url = "http://admin.gadgetsinasia.com/admin";
			  var url= "http://localhost:6060/sellersignin.html"
			  // var url="https://gadgetsinasia.com/sellersignin.html"
	    	   $('#id_registerSucessParent').append('<a href="'+url+'" class="btn-round">Log In</a>');
	       }
	       
    }
    
	
  
//}); 

	

