var https = require('https');
const request = require('request');

var mysql = require('mysql');
var config = require('./config');
var business_id = config.getbusiness();
var baseUrl = config.getbaseurl();
var imageURL = config.getimageurl();

function get_json(url, callback) {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	request(baseUrl + url, { json: true }, (err, res, body) => {
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


function footercategories(url, callback) {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	request(baseUrl + url, { json: true }, (err, res, body) => {
		if (err) { return console.log(err); }
		callback(res.body);
	});
}

exports.index = function (req, res) {
	var data1 = [];

	data1['imageURL'] = imageURL;
	data1['business_id'] = business_id.business_id;


	var seoData = {
		seoId: 1,
		title: 'Featured gadgets, news articles and latest gadgets on Tradeexchange.co.',
		description: 'Check out the features stories and news articles about the latest and popular gadgets at Tradeexchange.co.',
		keywords: 'Featured gadgets, new articles, latest gadgets',
		special: ''
	};

	data1['seoData'] = seoData;
	get_json('allProducts', function (response) {
		data1['allitems'] = response;
		if (response.length > 0) {
			get_json('allBrands', function (response1) {
				data1['allBrands'] = response1;
				res.render('article', data1);
			})
		}
	});
}

exports.Home=function(req, res)
{
	var jsondata = [{
		seoId: 1,
		title: 'Tradeexchange.co',
		description: 'We are in the description of the seo tags',
		keywords: 'this keyword,that keyword, keyword keyword everywhere',
		special: ''
	}];
	res.render('Home', { data: 'Priyanka' });
}

exports.Productdetail=function(req, res)
{
	var jsondata = [{
		seoId: 1,
		title: 'Tradeexchange.co',
		description: 'We are in the description of the seo tags',
		keywords: 'this keyword,that keyword, keyword keyword everywhere',
		special: ''
	}];
	res.render('Productdetail', { data: 'Priyanka' });
}


exports.NewArivals=function(req, res)
{
	var jsondata = [{
		seoId: 1,
		title: 'Tradeexchange.co',
		description: 'We are in the description of the seo tags',
		keywords: 'this keyword,that keyword, keyword keyword everywhere',
		special: ''
	}];
	res.render('NewArivals', { data: 'Priyanka' });
}


exports.NewArivalslisting=function(req, res)
{
	var jsondata = [{
		seoId: 1,
		title: 'Tradeexchange.co',
		description: 'We are in the description of the seo tags',
		keywords: 'this keyword,that keyword, keyword keyword everywhere',
		special: ''
	}];
	res.render('NewArivalslisting', { data: 'Priyanka' });
}



exports.Register=function(req, res)
{
	var jsondata = [{
		seoId: 1,
		title: 'Tradeexchange.co',
		description: 'We are in the description of the seo tags',
		keywords: 'this keyword,that keyword, keyword keyword everywhere',
		special: ''
	}];
	res.render('Register', { data: 'Priyanka' });
}

exports.article = function (req, res) {
	console.log(req._parsedUrl.query);
	var urlparams = req._parsedUrl.query;
	var params = urlparams.split("&");
	var id = params[0].split("=");
	if (id[0] == 'id') {
		get_json('getFeaturedItemByID/' + id[1], function (response) {
			var jsondata = {
				seoId: 1,
				title: "Information about features of " + response[0].item_name + " on Tradeexchange.co.",
				description: response[0].item_description + ".",
				keywords: response[0].item_name,
				special: ''
			};
			res.render('article', jsondata);
		});
	}
}

exports.itemlist = function (req, res) {
	var jsondata = [{
		seoId: 1,
		title: 'Tradeexchange.co',
		description: 'We are in the description of the seo tags',
		keywords: 'this keyword,that keyword, keyword keyword everywhere',
		special: ''
	}];
	var data1 = [];
	data1['imageURL'] = imageURL;
	data1['business_id'] = business_id;
	var urlparams = req._parsedUrl.query;
	var params = urlparams.split("=");
	 var b_name = params[1];
	 data1['brand']=b_name;
	 get_json('allBrands', function (response) {
	 	data1['allBrands'] = response;
	 	if (response.length >= 0) {
			get_json('allProductsByBrand/' + b_name, function (response1) {
				data1['allProductsByBrand'] = response1
				res.render('itemlist', data1);
			})
		}
	});
}


exports.businesslist = function (req, res) {
	var jsondata = [{
		seoId: 1,
		title: 'Tradeexchange.co',
		description: 'We are in the description of the seo tags',
		keywords: 'this keyword,that keyword, keyword keyword everywhere',
		special: ''
	}];
	res.render('businesslist', { data: 'Priyanka' });
}

exports.sellersignup = function (req, res) {
	var jsondata = [{
		seoId: 1,
		title: 'Tradeexchange.co',
		description: 'We are in the description of the seo tags',
		keywords: 'this keyword,that keyword, keyword keyword everywhere',
		special: ''
	}];
	res.render('sellersignup', { data: 'Priyanka' });
}

exports.addInventory = function (req, res) {
	var data1 = [];
	var seoData = {
		seoId: 1,
		title: 'Featured gadgets, news articles and latest gadgets on Tradeexchange.co.',
		description: 'Check out the features stories and news articles about the latest and popular gadgets at Tradeexchange.co.',
		keywords: 'Featured gadgets, new articles, latest gadgets',
		special: ''
	};
	data1['seoData'] = seoData;
			get_json('allBrands', function (response1) {
				data1['allBrands'] = response1;
				res.render('addInventory', data1);
			})
}
exports.buyStocks = function (req, res) {
	var urlparams = req._parsedUrl.query;
	var parmsplit = urlparams.split("=");
	var id = parmsplit[1]
	var data1 = [];
	var jsondata = [{
		seoId: 1,
		title: 'Tradeexchange.co',
		description: 'We are in the description of the seo tags',
		keywords: 'this keyword,that keyword, keyword keyword everywhere',
		special: ''
	}];
	data1['seoData'] = jsondata;
	get_json('allBrands', function (response) {
		data1['allBrands'] = response;
		get_json("productByProduct_id/" + id, function (response1) {
			data1['productInfo'] = response1;
			res.render('buyStock', data1);
		})
	})
}
exports.fountaintraders = function (req, res) {
	var data1 = [];
	var jsondata = [{
		seoId: 1,
		title: 'Tradeexchange.co',
		description: 'We are in the description of the seo tags',
		keywords: 'this keyword,that keyword, keyword keyword everywhere',
		special: ''
	}];
	data1['seoData'] = jsondata;
	get_json('allTraders', function (response) {
		data1['alltraders'] = response;
		get_json('allBrands', function (response1) {
			data1['allBrands'] = response1;
			res.render('fountaintraders', data1);
		})
	})
}

exports.tradersforfountaintechies=function(req,res){
	var data1=[];
	var jsondata = [{
		seoId: 1,
		title: 'Tradeexchange.co',
		description: 'We are in the description of the seo tags',
		keywords: 'this keyword,that keyword, keyword keyword everywhere',
		special: ''
	}];
	data1['seoData']=jsondata;
	get_json('allBrands', function (response) {
		data1['allBrands'] = response;
		res.render('addFountainTraders', data1);
	})
}

exports.productinfo=function(req,res){
	var product_buy_req_value;
	var urlparams = req._parsedUrl.query;
	var req_param=urlparams.split("=");
	var  id=req_param[1];
	var data1=[];
	var jsondata = [{
		seoId: 1,
		title: 'Tradeexchange.co',
		description: 'We are in the description of the seo tags',
		keywords: 'this keyword,that keyword, keyword keyword everywhere',
		special: ''
	}];
	data1['seoData']=jsondata;
	get_json('allBrands', function (response) {
		data1['allBrands'] = response;
		get_json("productByProduct_Title/" + id, function (response1) {
			data1['productInfo'] = response1;
			get_json("productReqListByProductId/"+id,function(response2){
				data1['product_buy_req']=response2;
				if(response2.length>0){
					 product_buy_req_value=true;
					data1['product_buy_req_value']=product_buy_req_value;
				}else{
					 product_buy_req_value=false;
					data1['product_buy_req_value']=product_buy_req_value;
				}
				res.render('productinfo', data1);
			})
		})
	})
}
exports.buyinventory=function(req,res){
	var data1 = [];
	var seoData = {
		seoId: 1,
		title: 'Featured gadgets, news articles and latest gadgets on Tradeexchange.co.',
		description: 'Check out the features stories and news articles about the latest and popular gadgets at Tradeexchange.co.',
		keywords: 'Featured gadgets, new articles, latest gadgets',
		special: ''
	};
	data1['seoData'] = seoData;
			get_json('allBrands', function (response1) {
				data1['allBrands'] = response1;
				res.render('buyinventory.html', data1);
			});
}

exports.orderconfermation=function(req,res){
	var data1 = [];
	var seoData = {
		seoId: 1,
		title: 'Featured gadgets, news articles and latest gadgets on Tradeexchange.co.',
		description: 'Check out the features stories and news articles about the latest and popular gadgets at Tradeexchange.co.',
		keywords: 'Featured gadgets, new articles, latest gadgets',
		special: ''
	};
	data1['seoData'] = seoData;
			get_json('allBrands', function (response1) {
				data1['allBrands'] = response1;
				res.render('orderconfermation.html', data1);
			});

}

exports.chargerdetails = function (req, res) {
	var urlparams = req._parsedUrl.query;
	var params = urlparams.split("&");
	var id = params[0].split("=");
	if (id[0] == 'product') {
		get_json(baseUrl + 'getAccessoryByID/' + id[1], function (response) {
			var jsondata = {
				seoId: 1,
				title: response.item_name,
				description: response.item_description,
				keywords: response.item_name,
				special: ''
			};
			res.render('chargerdetails', jsondata);
		});

	}

}


exports.product = function (req, res) {
	var urlparams = req._parsedUrl.query;
	var params = urlparams.split("&");
	var id = params[0].split("=");
	if (id[0] == 'product') {
		get_json(baseUrl + 'getItemById/' + id[1], function (response) {
			var jsondata = {
				seoId: 1,
				title: "Technical information about " + response.item_name + " on Tradeexchange.co",
				description: "Information about " + response.item_name + " and technical specifications about "
					+ response.item_name + ". " + response.item_name + " has " + response.internal_storage +
					" internal memory and " + response.secondary_camera + " camera.",
				keywords: response.item_name + "," + response.processor_core + "," + response.internal_storage + "," + response.secondary_camera,
				special: ''
			};
			get_json(baseUrl + 'getBusinessForAdvertiseByItemId/' + id[1], function (response) {

				res.render('product', { meta: jsondata, data: response });
			});

		});
	}
}



exports.itemlistmore = function (req, res) {
	var jsondata = [{
		seoId: 1,
		title: 'Tradeexchange.co',
		description: 'We are in the description of the seo tags',
		keywords: 'this keyword,that keyword, keyword keyword everywhere',
		special: ''
	}];
	res.render('itemlistmore', { data: 'Priyanka' });
}

exports.searchresult = function (req, res) {
	var jsondata = [{
		seoId: 1,
		title: 'Tradeexchange.co',
		description: 'We are in the description of the seo tags',
		keywords: 'this keyword,that keyword, keyword keyword everywhere',
		special: ''
	}];
	res.render('searchresult', { data: 'Priyanka' });
}

exports.registersuccess = function (req, res) {
	var jsondata = [{
		seoId: 1,
		title: 'Tradeexchange.co',
		description: 'We are in the description of the seo tags',
		keywords: 'this keyword,that keyword, keyword keyword everywhere',
		special: ''
	}];
	res.render('RegisterSuccessful', { data: 'Priyanka' });
}

exports.sellersignin = function (req, res) {
	var jsondata = [{
		seoId: 1,
		title: 'Tradeexchange.co',
		description: 'We are in the description of the seo tags',
		keywords: 'this keyword,that keyword, keyword keyword everywhere',
		special: ''
	}];
	res.render('sellersignin', { data: 'Priyanka' });
}

exports.launchgadgets = function (req, res) {
	var jsondata = [{
		seoId: 1,
		title: 'Tradeexchange.co',
		description: 'We are in the description of the seo tags',
		keywords: 'this keyword,that keyword, keyword keyword everywhere',
		special: ''
	}];
	res.render('launchgadgets', { data: 'Priyanka' });
}
exports.clientProfile = function (req, res) {
	var jsondata = [{
		seoId: 1,
		title: 'Tradeexchange.co',
		description: 'We are in the description of the seo tags',
		keywords: 'this keyword,that keyword, keyword keyword everywhere',
		special: ''
	}];
	res.render('clientProfile', { data: 'Priyanka' });
}






