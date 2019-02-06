// ----receive function----v

var https = require('https');
const request = require('request');

var mysql = require('mysql');
var config = require('./config');
var business_id = config.getbusiness();
var baseUrl = config.getbaseurl();
var imageURL = config.getimageurl();


console.log(baseUrl);
console.log(imageURL);


function get_json(url, callback) {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	  request(baseUrl+url, { json: true }, (err, res, body) => {
		  if (err) { return console.log(err); }
		  callback(res.body);
		});
}

//function get_json(url, callback) {
//    https.get(baseUrl+url+'/1', function(res) {
//        var body = '';
//        res.on('data', function(chunk) {
//            body += chunk;
//        });
//
//        res.on('end', function() {
//            var response = JSON.parse(body);
//// call function ----v
//            callback(response);
//        });
//    });
//}


         // -----------the url---v         ------------the callback---v


exports.index = function (req, res){
//	var data1=[];
//	    
//	    	 data1['imageURL']=imageURL;
//	        data1['business_id']=business_id.business_id;
//	        
//	     
//	var seoData = { seoId: 1,
//	    title: 'Featured gadgets, news articles and latest gadgets on Gadgetsinasia.',
//	    description: 'Check out the features stories and news articles about the latest and popular gadgets at Gadgetsinasia.',
//	    keywords: 'Featured gadgets, new articles, latest gadgets',
//	    special: '' };	
//	   
//	    data1['seoData'] = seoData;
//	   	    	   	   
//	    footercategories('categoriesbybusinessid/40',function(response){
//	    	data1['jsondata']=response;
//	    	if(response.length>0)
//	    	{
//	    		get_json('getPortalNews',function(response1){
//	    			console.log(response1);
//	    			data1['news']=response1;
//	    			if(response1.length>0)
//	    			{
//	    				get_json('getPortalLatestItems',function(response2){
//	    					console.log(response2);
//	    					data1['gadgets']=response2;
//	    					if(response2.length>0)
//	    					{
//	    						 get_json('getFeaturedItems',function(response3){
//	    								console.log(response3);
//	    								data1['featured_items']=response3;
//	    								for(var i=0;i<data1['featured_items'].length;i++)
//	    								{
//	    									data1['featured_items'][i].item_name1=data1['featured_items'][i].item_name.replace(/ /g, "-");
//	    								}
//	    								
//	    								get_json('portalitemsbybusinessid/'+business_id.business_id,function(response4){
//	    									data1['allitems'] = response4;
//	    									res.render('index',data1);
//	    								});
//	    								
//	    							});
//	    					}
//	    				});
//	    			}
//	    		});
//	    	}
//	    });	 
	
	    console.log(req.headers.host);
	    
	    var business_name = req.headers.host.split('.');
	
	     var data1 ={
		    id:1,
		    name:'Buy latest phones on '+business_name[0].toUpperCase()
		  } 
		  res.render('store/index',data1);
}

exports.article = function (req, res){
	console.log(req._parsedUrl.query);
		   var urlparams = req._parsedUrl.query;
	       var params = urlparams.split("&");
	       var id = params[0].split("=");
	       if (id[0]=='id') {
	    	   get_json('getFeaturedItemByID/'+id[1],function(response){
	    			console.log(response);
	    			var jsondata = { seoId: 1,
	    			    title: "Information about features of "+response[0].item_name+" on Gadgetsinasia.",
	    			    description: response[0].item_description+".",
	    			    keywords: response[0].item_name,
	    			    special: '' };
	    			     
	    			    res.render('article', jsondata);
	    		});
	       }		
	
}

exports.itemlist = function (req, res){
	var jsondata = [{ seoId: 1,
	    title: 'Gadgetsinasia',
	    description: 'We are in the description of the seo tags',
	    keywords: 'this keyword,that keyword, keyword keyword everywhere',
	    special: '' }];	     
//	    res.render('itemlist', {data: 'Priyanka'});
	    var data1=[];
	    data1['imageURL']=imageURL;
        data1['business_id']=business_id;
	    console.log(req._parsedUrl.query);
	    var urlparams = req._parsedUrl.query;
	    var params = urlparams.split("?");
	    var id = params[0].split("=");
	    var id1 = params[1].split("=");
	    console.log(params);
	    console.log(id);
	    console.log(id1);
	    data1['id']=id;
	    data1['id2']=id1;
	    if (id[0]=='mcat_id') {
	    	 if (id[1]=='1') {
	    		 get_json('categoriesbybusinessid/'+business_id.business_id,function(response3){
						// console.log(response3);
						console.k=log('item list ');
						data1['categories']=response3;
//						res.render('itemlist',data1);
					});
	    		 if (id1[0]=='cat_id') {
	    			 get_json('getPortalItemsByCategoryID/' + id1[1],function(response4){
							// console.log(response4);
							data1['itemList']=response4;
							for(var i=0;i<data1['itemList'].length;i++)
							{
								data1['itemList'][i].itemImage=data1['itemList'][i].item_image.split(',');	
							}
							res.render('itemlist',data1);
						});
	    		 }
	    		 
	    	 }else{
	    		 res.render('itemlist',data1);
	    	 }	    	
	    }
}

exports.product = function (req, res){
	var urlparams = req._parsedUrl.query;
    var params = urlparams.split("&");
    var id = params[0].split("=");
    if (id[0]=='product') {
    	console.log(id[1]);
 	   get_json('getItemById/'+id[1],function(response){
 			var jsondata = { seoId: 1,
 			    title: "Technical information about "+response.item_name+" on Gadgetsinasia",
 			    description: "Information about "+response.item_name+" and technical specifications about "
 			                 +response.item_name+". "+response.item_name+" has "+response.internal_storage+
 			                 " internal memory and "+response.secondary_camera+" camera.",
 			    keywords: response.item_name+","+response.processor_core+","+response.internal_storage+","+response.secondary_camera,
 			    special: '' };
 			get_json('getBusinessForAdvertiseByItemId/'+id[1],function(response){
 				
 				res.render('product', {meta:jsondata,data:response});
 			});
 			 
 		});
    }	
}

exports.businesslist = function (req, res){
	var jsondata = [{ seoId: 1,
	    title: 'Gadgetsinasia',
	    description: 'We are in the description of the seo tags',
	    keywords: 'this keyword,that keyword, keyword keyword everywhere',
	    special: '' }];	     
	    res.render('businesslist', {data: 'Priyanka'});
}

exports.sellersignup = function (req, res){
	var jsondata = [{ seoId: 1,
	    title: 'Gadgetsinasia',
	    description: 'We are in the description of the seo tags',
	    keywords: 'this keyword,that keyword, keyword keyword everywhere',
	    special: '' }];	     
	    res.render('sellersignup', {data: 'Priyanka'});
}

exports.chargerdetails = function (req, res){
	var urlparams = req._parsedUrl.query;
    var params = urlparams.split("&");
    var id = params[0].split("=");
    console.log(id[1]);
    if (id[0]=='product') {
    	console.log(id[1]);
 	   get_json('getAccessoryByID/'+id[1],function(response){
 		   
 		   console.log(response);
 			var jsondata = { seoId: 1,
 			    title: response.item_name,
 			    description: response.item_description,
 			    keywords: response.item_name,
 			    special: '' };
 			     
 			    res.render('chargerdetails', jsondata);
 		});
 	  
    }	

}

exports.itemlistmore = function (req, res){
	var jsondata = [{ seoId: 1,
	    title: 'Gadgetsinasia',
	    description: 'We are in the description of the seo tags',
	    keywords: 'this keyword,that keyword, keyword keyword everywhere',
	    special: '' }];	     
	    res.render('itemlistmore', {data: 'Priyanka'});
}

exports.searchresult = function (req, res){
	var jsondata = [{ seoId: 1,
	    title: 'Gadgetsinasia',
	    description: 'We are in the description of the seo tags',
	    keywords: 'this keyword,that keyword, keyword keyword everywhere',
	    special: '' }];	     
	    res.render('searchresult', {data: 'Priyanka'});
}

exports.registersuccess = function (req, res){
	var jsondata = [{ seoId: 1,
	    title: 'Gadgetsinasia',
	    description: 'We are in the description of the seo tags',
	    keywords: 'this keyword,that keyword, keyword keyword everywhere',
	    special: '' }];	     
	    res.render('RegisterSuccessful', {data: 'Priyanka'});
}

exports.sellersignin = function (req, res){
	var jsondata = [{ seoId: 1,
	    title: 'Gadgetsinasia',
	    description: 'We are in the description of the seo tags',
	    keywords: 'this keyword,that keyword, keyword keyword everywhere',
	    special: '' }];	     
	    res.render('sellersignin', {data: 'Priyanka'});
}
 
exports.launchgadgets = function (req, res){
	var jsondata = [{ seoId: 1,
	    title: 'Gadgetsinasia',
	    description: 'We are in the description of the seo tags',
	    keywords: 'this keyword,that keyword, keyword keyword everywhere',
	    special: '' }];	     
	    res.render('launchgadgets', {data: 'Priyanka'});
}






