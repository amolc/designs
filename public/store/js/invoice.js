//$(document).ready(function() {  
  
    getCurrentUser();
    onGetInvoice();
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	
	var subTotal = 0;
	var deliveryC = 0;
	var finalTotal = 0;
	var orderBodyTable = [];
	var content = [];

//}); 

 
	//image to dataUrl
	function toDataUrl(url, value, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                callback(reader.result,value);
            }
            reader.readAsDataURL(xhr.response);
        };

        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }
	
 function onGetInvoice(){

	 var url = window.location.href;
	    var parts = url.split("?");
	    if(parts.length>1){	    	
		       var urlparams = parts[1];
		       var params = urlparams.split("&");
		       var id = urlparams.split("=")
		       if (id[0]=='payment') {
		    	   
		    	   $.ajax({   
		    	        async: true,  
		    	        url: baseUrl + "getOrderDetails/"+id[1],  
		    	        method: "GET", 
		    	        headers: {  
		    	            "accept": "application/json;odata=verbose",  
		    	            "content-type": "application/json;odata=verbose"  
		    	        },
		    	        success: function(res1) { 
		    	        	
		    	        	var postData = {
		    	        		id:	res1.record[0].user_id,
		    	        		payment_id: res1.record[0].payment_id
		    	        	};
		    	        	
		    	        	$.ajax({
		    	    	        type: "POST",
		    	    	        url: baseUrl + 'getuseradderess',
		    	    	        data: postData,// now data come in this function
		    	    	        crossDomain: true,
		    	    	        dataType: "json",		    	    	        
		    	    	        success: function (res2) {
		    	    	        		    	    	        	
		    	    	        	$.ajax({   
		    			    	        async: false,  
		    			    	        url: baseUrl + "getOrderPaymentByPaymentID/"+id[1],  
		    			    	        method: "GET", 
		    			    	        headers: {  
		    			    	            "accept": "application/json;odata=verbose",  
		    			    	            "content-type": "application/json;odata=verbose"  
		    			    	        },
		    			    	        success: function(res3) { 
		    			    	        	var htmlOrderDetails = '';
		    			    	        	$('#id_cartTable').html('');
		    			    	        	var totalPrice = 0;
		    			    	        	$(res1.record).each(function( index, value ) {
		    			    	        		totalPrice = totalPrice + parseInt(value.item_price)*parseInt(value.quantity);
		    			    	        		htmlOrderDetails = htmlOrderDetails + '<tr>'
		    			    		                    +'<td class="text-center">'+value.item_name+'</td>'
		    			    		                    +'<td class="text-center">'
		    			    		                    +'<img src="'+imageURL+'/'+value.item_image+'" style="height:70px;width:70px;">'
		    			    		                    +'</td>'
		    			    		                    +'<td class="text-center">'+value.quantity+'</td>'
		    			    		                    +'<td class="text-center">$ '+value.item_price+'</td>'
		    			    		                    +'<td class="text-center">$ '+totalPrice+'</td>'		    			 
		    			    	                        +'</tr>';			    	    	      		
				    	    	        	});
		    			    	        	
		    			    	        	$('#id_cartTable').append(htmlOrderDetails);
		    			    	        	
		    			    	        
		    			    	        	var deliveryCharges = res3[0].amount - totalPrice;
		    			    	        	var total = parseInt(res3[0].amount);
		    			    	        	
		    			    	        	subTotal = totalPrice;
		    			    	        	deliveryC = deliveryCharges;
		    			    	        	finalTotal = total;
		    			    	        	
		    			    	        	$('#id_cartTable').append('<tr style="border: 1px solid #e8e8e8;">'
                                                   +'<th colspan="4" style="text-align:right">Sub Total</th>'
                                                   +'<th style="text-align:left">'+totalPrice.toLocaleString()+'.00</th>'
                                                   +'</tr>');
		    			    	        	
		    			    	        	$('#id_cartTable').append('<tr style="border: 1px solid #e8e8e8;">'
	                                                   +'<th colspan="4" style="text-align:right">Delivery Charges</th>'
	                                                   +'<th style="text-align:left">'+deliveryCharges.toLocaleString()+'.00</th>'
	                                                   +'</tr>');
		    			    	        	
		    			    	        	$('#id_cartTable').append('<tr style="border: 1px solid #e8e8e8;">'
                                                       +'<th colspan="4" style="text-align:right">Total</th>'
                                                       +'<th style="text-align:left">'+total.toLocaleString()+'.00</th>'
                                                       +'</tr>');		    			    	        			  			    	        
		    			    	        
		    			    	       		    	    	        	
		    	    	        	$('#id_OrderNo').html(""+id[1]);
		    	    	        	$('#id_Name').html(res2.record.defaultaddress.first_name+' '+res2.record.defaultaddress.last_name);
		    	    	        	$('#id_Email').html(res2.record.defaultaddress.email);
		    	    	        	$('#id_Mobile').html(res2.record.shippingaddress.phone_no);
		    	    	        	
		    	    	        	$('#id_addressName').html(res2.record.shippingaddress.name);
		    	    	        	$('#id_address').html(res2.record.shippingaddress.shipping_address);
		    	    	        	$('#id_addressPostalCode').html(res2.record.shippingaddress.country+' '+res2.record.shippingaddress.postal_code);
		    	    	        			    	    	        	
		    	    	        	orderBodyTable = [
	    								[
	    									{text: 'Image', style: 'tableHeader'},
	    									{text: 'Product', style: 'tableHeader'},
	    									{text: 'QTY', style: 'tableHeader'},
	    									{text: 'Unit Price', style: 'tableHeader'},
	    									{text: 'Total Price', style: 'tableHeader'}
	    								]
	    									    								
	    							];

		    	    	        	
		    	    	        	
                                    for(var i=0;i<res1.record.length;i++){
                                    	    value = res1.record[i];
	                                    	value.item_image = value.item_image.split(',');
	                                    	
	                                    	console.log(value);
	                                    		                                    				    	    	        		
			    	    	        		toDataUrl(imageURL+'/'+value.item_image[0],value,function(myBase64,product) {

			    	    	        			  var innerArray = [
					    	    	        			{
					    	    	        				image: myBase64,
					    	    	        				width: 50,
					    	    	        				height: 50,
					    	    	        			},
				    									{text: product.item_name, color: 'gray'},				    								    
				    									{text: product.quantity, color: 'gray'},
				    									{text: product.item_price, color: 'gray'},
				    									{text: parseInt(product.quantity*product.item_price), color: 'gray'},
				    								];
			    	    	        			  
			    	    	        			  console.log(innerArray);
			    	    	        			     			    	    	        			     
					    	    	        		orderBodyTable.push(innerArray);					    	    	        		
					    	    	        				    	    	        			
			    	    	        		});	
                                    }
                                    
                                    console.log(orderBodyTable);
                                  
		    	    	        	

						    	     content = [		    							    					
						    					'Invoice\n\n',
						    					{
						    						style: 'tableExample',
						    						table: {
						    							widths: [200, '*', '*', 150],
						    							body: [
						    								[
						    									'Customer Details',
						    									'',
						    									'',
						    									'Shipping Details'
						    							    ],						    							    						    							    
						    								[
						    									{
						    										table: {
						    											body: [
						    												['ORDER NO',res1.record[0].payment_id],						    												
						    											]
						    										},
						    										layout: 'noBorders'
						    									},
						    									'',
						    								    '',
						    								    res2.record.shippingaddress.name
						    							    ],
						    								[
						    									{
						    										table: {
						    											body: [
						    												['NAME',res2.record.defaultaddress.first_name+' '+res2.record.defaultaddress.last_name],						    												
						    											]
						    										},
						    										layout: 'noBorders'
						    									},
						    									'',
						    									'',
						    									res2.record.shippingaddress.shipping_address
						    								],	
						    								[
						    									{
						    										table: {
						    											body: [
						    												['EMAIL',res2.record.defaultaddress.email],						    												
						    											]
						    										},
						    										layout: 'noBorders'
						    									},
						    									'',
						    									'',
						    									res2.record.shippingaddress.country+' '+res2.record.shippingaddress.postal_code
						    								],
						    								[
						    									{
						    										table: {
						    											body: [
						    												['Tel',res2.record.shippingaddress.phone_no],						    												
						    											]
						    										},
						    										layout: 'noBorders'
						    									},
						    									'',
						    									'',
						    									''
						    								],
						    							]
						    						},
						    						layout: 'noBorders'
						    					},
						    										    											    								
						    				];
						    				
						    				
						    			
						        	
		    			    	   },error: function(error) {  
		    			    	            console.log(JSON.stringify(error));  	    	  
		    			    	      }   
		    			    	   });
						        	
		    	    	        },error: function (jqXHR, status) {
		    	    	            // error handler
		    	    	            console.log(jqXHR);
		    	    	            alert('fail' + status.code);
		    	    	        }
		    	    	 });
		    	        	
		    	        },error: function(error) {  
		    	            console.log(JSON.stringify(error));  	    	  
		    	        }   
		    	    });
		    	   	    	       
		    	   
		       }
	    }
	 
 }
 
		 
 function onOpenPDF(){
 
	 console.log(orderBodyTable);
	 var orderBodyTable1 = orderBodyTable;
	 onGetInvoice();
	 
	 var content1 = [];
 	 	
       	 var suTotalArray = [
       		 {colSpan:4,text:'Sub Total',alignment: 'right'},
       		 '',
       		 '',
       		 '',
       		 {text:'SGD '+subTotal.toLocaleString()}
       	];
       	orderBodyTable1.push(suTotalArray);
       	 
       	var deliveryChargesArray = [
       		 {colSpan:4,text:'Shipping Charges',alignment: 'right'},
       		 '',
       		 '',
       		 '',
       		 {text:'SGD '+deliveryC}
       	];
       	orderBodyTable1.push(deliveryChargesArray);
       	
       	var paymentTypeArray = [
       		{text:'Payment Type',alignment: 'right'},
       		{text:"Credit Card"},
       		{colSpan:2,text:'Total',alignment: 'right'},
       		'',
       		{text:'SGD '+finalTotal.toLocaleString()}
       	];
       	orderBodyTable1.push(paymentTypeArray);
       	
	   content1 = content;
       	var orderBodyObject = {
				style: 'tableExample',
				table: {
					widths: ['*', 200, '*','*',80],
					headerRows: 1,
					body: orderBodyTable1
				},				
	    };
	    
       	content1.push(orderBodyObject);
	 
	 var dd = {
				content: content1,
				styles: {
					header: {
						fontSize: 18,
						bold: true
					},
					bigger: {
						fontSize: 15,
						italics: true
					},
					tableExample: {
						margin: [0, 5, 0, 15]
					},
				},
				defaultStyle: {
					columnGap: 20
				}
				
			};
     pdfMake.createPdf(dd).open();
 }

	

