
var baseurl = "https://api.fountaintechies.com/api/";
    var imageURL = "https://api.fountaintechies.com/assets/web/40"; 

//var baseurl = "http://localhost:2000/api/" ;
//var imageURL = "http://localhost:2000/assets/web/40";

var host = document.location.hostname;
var appname = host.split('.')[0];
  
$.ajax({     
    async: false,  
    url: baseurl+'getbusinessbyname/' + appname,  
    method: "GET", 
    headers: {  
        "accept": "application/json;odata=verbose",  
        "content-type": "application/json;odata=verbose"  
    },  
    success: function(res) {  
    	 localStorage.setItem(''+appname,JSON.stringify(res[0]));
    },error: function(error) {  
        console.log(error);  	    	    
    }  
}); 

var bussiness = JSON.parse(localStorage.getItem(''+appname));
var business_id = { business_id: bussiness.business_id }; 

//if(document.location.hostname == "priya.com" || document.location.hostname == "www.priya.com"){
//	var business_id = { business_id: 12 };
//	var baseurl = "https://www.sparksinasia.com/api/" ;
//    var imageURL = "https://www.sparksinasia.com/assets/";
//} else{
//	 var business_id = { business_id: 11 };
//     var baseurl = "https://www.sparksinasia.com/api/" ;
//     var imageURL = "https://www.sparksinasia.com/assets/";
//}

//if(env === 'local'){
//  var business_id = { business_id: 32 };
//  var baseURL = 'http://localhost:2000/api/';
//  var imageURL = 'http://localhost:2000/assets/';
//}else if(env === 'dev'){
//  var business_id = { business_id: 32 };
//  var baseURL= "https://www.sparksinasia.com/api/";
//  var imageURL = "https://www.sparksinasia.com/assets/";
//}  
