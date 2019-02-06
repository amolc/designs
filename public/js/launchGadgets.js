//$(document).ready(function() {  
  
//    getCategories(); 
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;

	 var gadgetImage = "";
	 var gadgetImageName = "";
  
//}); 

function onChangeImage() {
		  
         var newfile = document.getElementById("id_gadgetpic").files[0];
         var imageType = /image.*/;
         if (newfile.type.match(imageType)) {
             var oFReader = new FileReader();
             oFReader.onload = function(oFREvent) {
            	 gadgetImage = oFReader.result;
            	 gadgetImageName = document.getElementById("id_gadgetpic").files[0].name;
            	 var displayimage = document.getElementById("display_image");
            	 displayimage.setAttribute("src",""+gadgetImage);               
	                
             };
             oFReader.readAsDataURL(newfile);
         } 
         
 };
 
 function addGadget(){
	 
	 var gadget = {
		 'name': $('#id_gadgetName').val(),
		 'price': $('#id_price').val(),
		 'description': $('#id_description').val(),
		 'detailed_description': $('#id_detaileddescription').val(),
		 'image':gadgetImage,
		 'image_name':gadgetImageName
	 }
	 
		 $.ajax({
		      type: "POST",
		      url: baseUrl + "launchGadget",
		      data: gadget,// now data come in this function
		      crossDomain: true,
		      dataType: "json",
		      success: function (data) {
		    	  alert('Gadget added successfully');
		      	console.log(data);
		      },error: function (jqXHR, status) {
		          // error handler
		          console.log(jqXHR);
		          alert('fail' + status.code);
		      }
		});
 }
     
 