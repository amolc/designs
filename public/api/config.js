
exports.getbusiness = function (req, res){
	var business_id = { business_id: 40 };
	return business_id;
}

exports.getbaseurl = function (req, res){
	var baseurl = "https://api.fountaintechies.com/api/";
  // var baseurl = "http://localhost:2000/api/";
	return baseurl;
}

exports.getimageurl = function (req, res){
	var imageURL = "https://api.fountaintechies.com/assets/"; 
	// var imageURL = "http://localhost:2000/assets/"; 
	return imageURL;
}

