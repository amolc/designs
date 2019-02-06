//$(document).ready(function() {  
  
    getCurrentUser();
    onGetInvoice();
    setupqr();
    var business_id = business_id;
	var imageURL = imageURL;
	var baseUrl = baseurl;
	
	var subTotal = 0;
	var total = 0;
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
	 var canvas = document.getElementById('qrcanv');
   	 var dataURL = canvas.toDataURL();
//   	 localStorage.setItem('qrcode',dataURL);
//   	 console.log(dataURL);
   	 var logo='data:image/png;base64,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';
   		var url = window.location.href;
	    var parts = url.split("?");
	    if(parts.length>1){	    	
		       var urlparams = parts[1];
		       var params = urlparams.split("&");
		       var id = urlparams.split("=")
		       if (id[0]=='OrderId') {
		    	   
		    	   $.ajax({   
		    	        async: true,  
		    	        url: baseUrl + "getOrderDetails/"+id[1],  
		    	        method: "GET", 
		    	        headers: {  
		    	            "accept": "application/json;odata=verbose",  
		    	            "content-type": "application/json;odata=verbose"  
		    	        },
		    	        success: function(res1) { 
		    	        	doqr(id[1]);
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
		    			    	        url: baseUrl + "businessinfo/"+business_id.business_id,
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
		    			    	        		var itemImage = value.item_image;
		    			    	 		       var itemImage1 = itemImage.split(",")
		    			    	        		htmlOrderDetails = htmlOrderDetails + '<tr>'
		    			    		                    +'<td class="text-center">'+value.item_name+'</td>'
		    			    		                    +'<td class="text-center">'
		    			    		                    +'<img src="'+imageURL+'/'+itemImage1[0]+'" style="height:70px;width:70px;">'
		    			    		                    +'</td>'
		    			    		                    +'<td class="text-center">'+value.quantity+'</td>'
		    			    		                    +'<td class="text-center">$ '+value.item_price+'</td>'
		    			    		                    +'<td class="text-center">$ '+totalPrice+'</td>'		    			 
		    			    	                        +'</tr>';			    	    	      		
				    	    	        	});
		    			    	        	
		    			    	        	$('#id_cartTable').append(htmlOrderDetails);
		    			    	        	
		    			    	        
//		    			    	        	var deliveryCharges = res3[0].amount - totalPrice;
		    			    	        	total = parseInt(res1.record[0].total);
		    			    	        	
		    			    	        	subTotal = parseInt(res1.record[0].sub_total);
//		    			    	        	deliveryC = deliveryCharges;
		    			    	        	finalTotal = total;
		    			    	        	
		    			    	        	$('#id_cartTable').append('<tr style="border: 1px solid #e8e8e8;">'
                                                   +'<th colspan="4" style="text-align:right">Sub Total</th>'
                                                   +'<th style="text-align:left">'+totalPrice.toLocaleString()+'.00</th>'
                                                   +'</tr>');
		    			    	        	
		    			    	        	$('#id_cartTable').append('<tr style="border: 1px solid #e8e8e8;">'
	                                                   +'<th colspan="4" style="text-align:right">Discount</th>'
	                                                   +'<th style="text-align:left">'+(subTotal-total).toLocaleString()+'.00</th>'
	                                                   +'</tr>');
		    			    	        	
		    			    	        	$('#id_cartTable').append('<tr style="border: 1px solid #e8e8e8;">'
                                                       +'<th colspan="4" style="text-align:right">Total</th>'
                                                       +'<th style="text-align:left">'+total.toLocaleString()+'.00</th>'
                                                       +'</tr>');		    			    	        			  			    	        
		    			    	        
		    			    	       		    	    	        	
		    	    	        	$('#id_OrderNo').html(""+id[1]);
		    	    	        	$('#id_Name').html(res2.record.defaultaddress.first_name+' '+res2.record.defaultaddress.last_name);
		    	    	        	$('#id_Email').html(res2.record.defaultaddress.email);
//		    	    	        	$('#id_Mobile').html(res2.record.shippingaddress.phone_no);
		    	    	        	
		    	    	        	$('#id_addressName').html(res3.business_name);
		    	    	        	$('#id_address').html(res3.business_address);
		    	    	        	$('#id_addressPostalCode').html(res3.business_mobileNumber);
		    	    	        			    	    	        	
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
						    					'',
						    					{
						    						style: 'tableExample',
						    						table: {
						    							widths: [200, '*', '*', 150],
						    							body: [
						    								[
						    									{
						    										colSpan: 4,
							    	    	        				image: logo,
							    	    	        				width: 500,
							    	    	        				height: 30,
						    									},
						    									
						    									'',
						    									'',
						    									'',
						    							    ],
						    							    [
						    									'',
						    									'',
						    									'',
						    									'',
						    							    ],
						    								[
						    									{
						    										table: {
						    											body: [
						    												['ORDER NO.',res1.record[0].payment_id],						    												
						    											]
						    										},
						    										layout: 'noBorders'
						    									},
						    									
						    									'Collection Point',
						    									'',
						    									'',
						    							    ],						    							    						    							    
						    								[
						    									['Customer Details'],
						    									res3.business_name,
						    								    '',
						    								    {
						    										
						    										rowSpan: 4,
							    	    	        				image: canvas.toDataURL(),
							    	    	        				width: 250,
							    	    	        				height: 100,
							    	    	        			},
						    								    
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
						    									{colSpan:2,text:res3.business_address},
						    									'',
						    								    '',
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
						    									
						    									'Tel:-'+res3.business_mobileNumber,
						    									'',
						    									'',
						    								],
						    								[
						    									{
						    										table: {
						    											body: [
						    												['Tel',''],						    												
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
       	var suTotalArray = [
      		 {colSpan:4,text:'Discount',alignment: 'right'},
      		 '',
      		 '',
      		 '',
      		 {text:'SGD '+(subTotal-total).toLocaleString()}
      	];
      	orderBodyTable1.push(suTotalArray);
       	 
//       	var deliveryChargesArray = [
//       		 {colSpan:4,text:'Shipping Charges',alignment: 'right'},
//       		 '',
//       		 '',
//       		 '',
//       		 {text:'SGD '+deliveryC}
//       	];
//       	orderBodyTable1.push(deliveryChargesArray);
//       	
       	var paymentTypeArray = [
       		
       		{colSpan:4,text:'Total',alignment: 'right'},
       		'',
       		'',
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

	

