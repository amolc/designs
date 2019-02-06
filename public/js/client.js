 profile();
 function profile(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var user_id=currentUser.id;


    $.ajax({
        type: "GET",
        url: baseUrl+"clientDetailsById/"+user_id,
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            console.log(data)
            var clientData="";
            var clientSellerData="";
            var clientBuyerData="";
            $(data.client).each(function(index, value){
                clientData=clientData+  '<div class="col-sm-6 col-md-6">'+ '<div><h2>'+value.name+'</h2></div>'+ '<div><h3>'+value.business_name+'</h3></div>'+'</div>'+
                '<div class="col-sm-6 md-6">'+ '<div><h2>'+value.mobile_number+'</h2></div>'+ '<div><h3>'+value.email_id+'</h3></div>'+'</div>'
                ;
            })
            $(data.clientSeller).each(function(index, value){
               
                clientSellerData=clientSellerData+"<tr>" +
                '<th scope="row">' +
                value.productName+
                "</th>" +
                "<td>" +
                value.price +
                "</td>" +
                "<td>" +
                value.qty +
                "</td>" +
                // "<td>" +
                // value.business_country
                // "</td>" +
                "<td>" +
                value.stock_location
                "</td>" +
                "</tr>";
            })
            $(data.clientBuyer).each(function(index, value){
                clientBuyerData=clientBuyerData+  "<tr>" +
                '<th scope="row">' +
                value.productName+
                "</th>" +
                "<td>" +
                value.price +
                "</td>" +
                "<td>" +
                value.qty +
                "</td>" +
                // "<td>" +
                // value.business_country
                // "</td>" +
                "<td>" +
                value.delivery_location
                "</td>" +
                "</tr>";
            })

            $("#client_details").append(clientData);
            $("#client_seller").append(clientSellerData);
            $("#client_buyer").append(clientBuyerData);
        },
        error: function(error) {
          console.log(JSON.stringify(error));
        }
       
        
	    			       

    })
 }