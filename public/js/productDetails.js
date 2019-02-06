//$(document).ready(function() {
//  getCurrentUser();
getProduct();
//	getRelatedProducts();
//sellers();
//buyers();
var business_id = business_id;
var imageURL = imageURL;
var baseUrl = baseurl;

//});

function getRelatedProducts(cat_id) {
  $.ajax({
    async: true,
    url: baseurl + "getPortalItemsByCategoryID/" + cat_id,
    method: "GET",
    headers: {
      accept: "application/json;odata=verbose",
      "content-type": "application/json;odata=verbose"
    },
    success: function(data) {
      var relatedGadgetsHtml = "";
      $(data).each(function(index, value) {
        var item_images = value.item_image.split(",");
        if (index < 6) {
          relatedGadgetsHtml =
            relatedGadgetsHtml +
            '<div class="classRowPaddingTop" >' +
            '<div class="classProductImgParent classLatestGadgets" align="center">' +
            '<a href="product.html?product=' +
            value.item_id +
            '"><img class="classProductImage" src="' +
            imageURL +
            "web/" +
            business_id.business_id +
            "/" +
            item_images[0] +
            '"></a>' +
            "</div>" +
            '<a href="product.html?product=' +
            value.item_id +
            '">' +
            '<h5 class="rightHeader">' +
            value.item_name +
            "</h5></a>" +
            '<p class="firstCaps">' +
            value.item_description +
            "</p>" +
            "</div>";
        }
      });

      $("#id_relatedGadgets").append(relatedGadgetsHtml);
      sellers();
      buyers();
    },
    error: function(error) {
      console.log(JSON.stringify(error));
    }
  });
}

function sellers() {
  var product_id = localStorage.getItem("productID");
  $.ajax({
    async: true,
    url: baseurl + "allSellersByProductId/" + product_id,
    method: "GET",
    headers: {
      accept: "application/json;odata=verbose",
      "content-type": "application/json;odata=verbose"
    },
    success: function(data) {
      var sell = "";
      $(data).each(function(index, value) {
        console.log(value);
        sell =
          sell +
          "<tr>" +
          '<th scope="row">' +
          value.stock_location +
          "</th>" +
          "<td>" +
          value.business_country +
          "</td>" +
          "<td>" +
          value.qty +
          "</td>" +
          "<td>" +
          '<button type="submit" class="btn btn-primary" onclick ="f1(' +
          value.id +
          ')" style="background-color: #1C4D5C !important;"> Enquiry' +
          "</button>" +
          "</td>" +
          "</tr>";
      });
      $("#sell-detil").append(sell);
    },
    error: function(error) {
      console.log(JSON.stringify(error));
    }
  });
}

function buyers() {
  var product_id = localStorage.getItem("productID");
  $.ajax({
    async: true,
    url: baseurl + "allBuyersByProductId/" + product_id,
    method: "GET",
    headers: {
      accept: "application/json;odata=verbose",
      "content-type": "application/json;odata=verbose"
    },
    success: function(data) {
      var buy = "";
      $(data).each(function(index, value) {
        console.log(value);
        buy =
          buy +
          "<tr>" +
          '<th scope="row">' +
          value.delivery_location +
          "</th>" +
          "<td>" +
          value.price +
          "</td>" +
          "<td>" +
          value.qty +
          "</td>" +
          "<td>" +
          '<button type="submit" class="btn btn-primary" onclick ="f1(' +
          value.id +
          ')" style="background-color: #1C4D5C !important;"> Offer' +
          "</button>" +
          "</td>" +
          "</tr>";
      });
      $("#buy-rev").append(buy);
    },
    error: function(error) {
      console.log(JSON.stringify(error));
    }
  });
}

function f1(id) {
  var productID = window.localStorage.getItem("productID");
  var productName = window.localStorage.getItem("productName");
  console.log(id, productID, productName);
}

function getProduct() {
  var url = window.location.href;
  var parts = url.split("?");
  if (parts.length > 1) {
    var urlparams = parts[1];
    var params = urlparams.split("&");
    var id = urlparams.split("=");
    if (id[0] == "product") {
      $.ajax({
        async: true,
        url: baseurl + "portalitemsbybusinessid/" + business_id.business_id,
        method: "GET",
        headers: {
          accept: "application/json;odata=verbose",
          "content-type": "application/json;odata=verbose"
        },
        success: function(data) {
          var product = {};

          $(data).each(function(index, value) {
            if (value.item_id == id[1]) {
              product = value;
              $("#id_quantityInputParent").append(
                '<input type="number" onchange="onChangeQty(' +
                  product.item_id +
                  ',this.value)" value="' +
                  localStorage.getItem("quantity") +
                  '" id="id_quantityInput">'
              );

              var htmlSlider = "";
              

              $(product.item_image).each(function(index, innerValue) {
                htmlSlider =
                  htmlSlider +
                  '<li><img class="imgSld" src="' +
                  imageURL +
                  "web/" +
                  business_id.business_id +
                  "/" +
                  innerValue +
                  '" alt="" ></li>';
              });

              $("#id_slider").append(htmlSlider);

              var colors = product.color.split(",");
              var htmlColors = "";
              localStorage.setItem("selectedColor", colors[0]);
              $(colors).each(function(index, value) {
                htmlColors =
                  htmlColors +
                  '<span id="' +
                  value +
                  '" style="background:' +
                  value +
                  '"></span>';
              });
              $("#id_colors").append(htmlColors);

              localStorage.setItem("currentCategory", product.category_id);
              localStorage.setItem("productID", product.item_id);
              localStorage.setItem("productName", product.item_name);

              $("#id_breadcrumCategory").append(
                '<a href="itemlist.html?mcat_id=1?cat_id=' +
                  product.category_id +
                  '">' +
                  product.category_name +
                  "</a>"
              );
              $("#id_breadcrumItem").append(
                "" + product.item_name + " " + product.internal_storage
              );
              $("#id_itemName").append(
                "" +
                  product.item_name +
                  " " +
                  product.internal_storage +
                  "/ Camera " +
                  product.secondary_camera
              );
              $("#prod_nm").append(
                "" + product.item_name + " " + product.internal_storage
              );

              // $('#id_itemPrice').append("$" + product.item_price);
              // var htmlGeneral = '<tr><td><b><h6>General</h6></b></td></tr>'
              // 	+ '<tr><td><b> In The Box</b></td><td>' + product.in_the_box + '</td></tr>'
              // 	+ '<tr><td><b> Model Number</b></td><td>' + product.model_number + '</td></tr>'
              // 	+ '<tr><td><b> Colors</b></td><td>' + product.color + '</td></tr>'
              // 	+ '<tr><td><b> Sim Type</b></td><td>' + product.sim_type + '</td></tr>'
              // 	+ '<tr><td><b> Touchscreen</b></td><td>' + product.touchscreen + '</td></tr>'
              // 	+ '<tr><td><b> OTG Compatible</b></td><td>' + product.otg_compatible + '</td></tr>';
              // $('#id_generalTable').append(htmlGeneral);

              // var htmlDisplay = '<tr><td><b><h6>Display Features</h6></b></td></tr>'
              // 	+ '<tr><td><b> Display Size</b></td><td>' + product.display_size + '</td></tr>'
              // 	+ '<tr><td><b> Resolution</b></td><td>' + product.resolution + '</td></tr>'
              // 	+ '<tr><td><b> Resolution Type</b></td><td>' + product.resolution_type + '</td></tr>'
              // 	+ '<tr><td><b> GPU</b></td><td>' + product.gpu + '</td></tr>'
              // 	+ '<tr><td><b> Display Type</b></td><td>' + product.display_type + '</td></tr>'
              // 	+ '<tr><td><b> Display Colors</b></td><td>' + product.display_colors + '</td></tr>';
              // $('#id_displayTable').append(htmlDisplay);

              // var htmlOsProcessor = '<tr><td><b><h6>Os & Processor Features</h6></b></td></tr>'
              // 	+ '<tr><td><b> Operating System</b></td><td>' + product.operating_system + '</td></tr>'
              // 	+ '<tr><td><b> Processor Type</b></td><td>' + product.processor_type + '</td></tr>'
              // 	+ '<tr><td><b> Processor Core</b></td><td>' + product.processor_core + '</td></tr>';
              // $('#id_osProcessorTable').append(htmlOsProcessor);

              // var htmlMemoryStorage = '<tr><td><b><h6>Memory & Storage Features</h6></b></td></tr>'
              // 	+ '<tr><td><b> Internal Storage</b></td><td>' + product.internal_storage + '</td></tr>'
              // 	+ '<tr><td><b> RAM</b></td><td>' + product.ram + '</td></tr>'
              // 	+ '<tr><td><b> Expandable Storage</b></td><td>' + product.expandable_storage + '</td></tr>'
              // 	+ '<tr><td><b> Supported Memory Card</b></td><td>' + product.supported_memory_card + '</td></tr>'
              // 	+ '<tr><td><b> Memory Card Slot Type</b></td><td>' + product.memory_card_slot_type + '</td></tr>';
              // $('#id_memoryStorage').append(htmlMemoryStorage);

              // var htmlCameraFeatures = '<tr><td><b><h6>Camera Features</h6></b></td></tr>'
              // 	+ '<tr><td><b> Primary Camera</b></td><td>' + product.primary_camera + '</td></tr>'
              // 	+ '<tr><td><b> Secondary Camera</b></td><td>' + product.secondary_camera + '</td></tr>';
              // $('#id_cameraFeatures').append(htmlCameraFeatures);

              // var htmlConnectivity = '<tr><td><b><h6>Connectivity Features</h6></b></td></tr>'
              // 	+ '<tr><td><b> Network Type</b></td><td>' + product.network_type + '</td></tr>'
              // 	+ '<tr><td><b> Internet Connectivity</b></td><td>' + product.internet_connectivity + '</td></tr>'
              // 	+ '<tr><td><b> Bluetooth Support</b></td><td>' + product.bluetooth_support + '</td></tr>'
              // 	+ '<tr><td><b> Flash</b></td><td>' + product.flash + '</td></tr>'
              // 	+ '<tr><td><b> HD Recording</b></td><td>' + product.hd_recording + '</td></tr>'
              // 	+ '<tr><td><b> Full HD Recording</b></td><td>' + product.full_hd_recording + '</td></tr>'
              // 	+ '<tr><td><b> Video Recording</b></td><td>' + product.video_recording + '</td></tr>'
              // 	+ '<tr><td><b> Video Recording Resolution</b></td><td>' + product.video_recording_resolution + '</td></tr>';
              // $('#id_connectivity').append(htmlConnectivity);

              // var htmlOther = '<tr><td><b><h6>Other Details</h6></b></td></tr>'
              // 	+ '<tr><td><b> Network Type</b></td><td>' + product.smartphone + '</td></tr>'
              // 	+ '<tr><td><b> Internet Connectivity</b></td><td>' + product.sim_size + '</td></tr>'
              // 	+ '<tr><td><b> Bluetooth Support</b></td><td>' + product.removable_battery + '</td></tr>'
              // 	+ '<tr><td><b> Flash</b></td><td>' + product.graphics_ppi + '</td></tr>';
              // $('#id_other').append(htmlOther);

              // var htmlBatteryPower = '<tr><td><b><h6>Battery Capacity</h6></b></td></tr>'
              // 	+ '<tr><td><b> Battery Capacity</b></td><td>' + product.battery_power + '</td></tr>';
              // $('#id_batteryPower').append(htmlBatteryPower);

              // var htmlWarranty = '<tr><td><b><h6>Warranty</h6></b></td></tr>'
              // 	+ '<tr><td><b> Warranty Summary</b></td><td>' + product.warranty + '</td></tr>';
              // $('#id_warranty').append(htmlWarranty);

              // $('#id_screenSize').append("- <b>Screen Size:</b> " + product.display_size);
              // $('#id_rearCamera').append("- <b>Rear Camera: </b>" + product.primary_camera);
              // $('#id_frontCamera').append("- <b>Front Camera:</b> " + product.secondary_camera);
              // $('#id_ram').append("-<b> RAM: </b>" + product.ram);
              // $('#id_internalMemory').append("- <b>Internal Memory:</b> " + product.internal_storage);
              //			    	        	 $('#id_availability').append(""+product.availability);

              getRelatedProducts(product.category_id);
            }
          });

          if (
            localStorage.getItem("cart") != null &&
            localStorage.getItem("cart") != "undefined"
          ) {
            var cart = JSON.parse(localStorage.getItem("cart"));
            var isExists = false;
            $(cart).each(function(index, value) {
              var product = value;
              if (value.item_id == id[1]) {
                localStorage.setItem("quantity", value.quantity);
                isExists = true;
              }
            });
            if (!isExists) {
              localStorage.setItem("quantity", "1");
            }
          } else {
            localStorage.setItem("quantity", "1");
          }

          getBusinessForAdvertise(id[1]);

          // $('#id_buyNowParent').append('<a href="ShoppingCart.html?product='+product.item_id+'" class="btn-round"><i class="icon-basket-loaded margin-right-5"></i>Buy Now</a>');
        },
        error: function(error) {
          console.log(JSON.stringify(error));
        }
      });
    }
  }
}

$("#submit").on("click", function() {
  $("#alertmessage").text("");
  $("#alertmessage").hide();

  if (
    ($("#email").val() == "undefined" || $("#email").val() == "") &&
    ($("#name").val() == "undefined" || $("#name").val() == "") &&
    ($("#price").val() == "undefined" || $("#price").val() == "") &&
    ($("#qty").val() == "undefined" || $("#qty").val() == "") &&
    ($("#number").val() == "undefined" || $("#number").val() == "") &&
    ($("#businessName").val() == "undefined" ||
      $("#businessName").val() == "") &&
    ($("#stockLocation").val() == "undefined" ||
      $("#stockLocation").val() == "")
  ) {
    $("#alertmessage").text("All fields are mandatory");
    $("#alertmessage").show("slow");
  } else if ($("#name").val() == "undefined" || $("#name").val() == "") {
    $("#alertmessage").text("Name should not be empty");
    $("#alertmessage").show("slow");
  } else if ($("#email").val() == "undefined" || $("#email").val() == "") {
    $("#alertmessage").text("Email should not be empty");
    $("#alertmessage").show("slow");
  } else if (!/\S+@\S+\.\S+/.test($("#email").val())) {
    $("#alertmessage").text("Invalid email");
    $("#alertmessage").show("slow");
  } else if ($("#number").val() == "undefined" || $("#number").val() == "") {
    $("#alertmessage").text("Mobile should not be empty");
    $("#alertmessage").show("slow");
  } else {
    var $name = $("#name");
    var $price = $("#price");
    var $email = $("#email");
    var $number = $("#number");
    var $qty = $("#qty");
    var $businessCountry = $("#businessCountry");
    var $cc = $("#cc");
    var $businessName = $("#businessName");
    var $stockLocation = $("#stockLocation");
    var addStockData = {
      name: $name.val(),
      price: $price.val(),
      email: $email.val(),
      number: $number.val(),
      qty: $qty.val(),
      cc: $cc.val(),
      businessName: $businessName.val(),
      stockLocation: $stockLocation.val(),
      product_id: localStorage.getItem("productID"),
      productName: localStorage.getItem("productName"),
      password: $cc.val()+$number.val(),
      businessCountry: $businessCountry.val()
    };
    var body = JSON.stringify(addStockData);
    console.log(addStockData);
    $.ajax({
      async: true,
      type: "POST",
      url: baseurl + "addStocks",
      data: body,
      headers: {
        accept: "application/json;odata=verbose",
        "content-type": "application/json;odata=verbose"
      },
      success: function(result) {
        console.log("added in db with pending status");
        location.reload();
      },
      error: function() {
        console.log(error);
      }
    });
  }
});

$("#submit1").on("click", function() {
    var $name = $("#name1");
    var $price = $("#price1");
    var $email = $("#email1");
    var $number = $("#number1");
    var $qty = $("#qty1");
    var $businessCountry = $("#businessCountry1");
    var $cc = $("#cc1");
    var $businessName = $("#businessName1");
    var $deliveryLocation = $("#deliveryLocation1");
    var buyStockData = {
      name: $name.val(),
      price: $price.val(),
      email: $email.val(),
      number: $number.val(),
      qty: $qty.val(),
      cc: $cc.val(),
      businessName: $businessName.val(),
      deliveryLocation: $deliveryLocation.val(),
      product_id: localStorage.getItem("productID"),
      productName: localStorage.getItem("productName"),
      password: $cc.val()+$number.val(),
      businessCountry: $businessCountry.val()
    };
 
  var body = JSON.stringify(buyStockData);

  $.ajax({
    async: true,
    type: "POST",
    url: baseurl + "buyStocks",
    data: body,
    headers: {
      accept: "application/json;odata=verbose",
      "content-type": "application/json;odata=verbose"
    },
    success: function(result) {
      console.log("added in db with pending status");
      location.reload();
    },
    error: function() {
      console.log(error);
    }
  });
});

$(".clr").on("click", "span", function() {
  $(".selectedColor").removeClass("selectedColor");
  $(this).addClass("selectedColor");
  localStorage.setItem("selectedColor", "" + $(this).attr("id"));
});

function onChangeQty(item_id, qty) {
  localStorage.setItem("quantity", qty);
  var cart = JSON.parse(localStorage.getItem("cart"));
  $(cart).each(function(index, value) {
    if (value.item_id == item_id) {
      value.quantity = qty;
      value.total_price = parseInt(value.item_price) * parseInt(value.quantity);
    }
  });
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getBusinessForAdvertise(item_id) {
  $.ajax({
    async: true,
    url: baseurl + "getBusinessForAdvertiseByItemId/" + item_id,
    method: "GET",
    headers: {
      accept: "application/jso" + "n;odata=verbose",
      "content-type": "application/json;odata=verbose"
    },
    success: function(data) {
      console.log(data);
      var firstPosition = {};
      var secondPosition = {};
      var thirdPosition = {};
      var fourthPosition = {};
      var fifthPosition = {};
      var positions = [];

      var htmlBuyNow = "";

      $(data).each(function(index, value) {
        $.ajax({
          async: false,
          url: baseurl + "viewbasicinfodetails/" + value.business_id,
          method: "GET",
          headers: {
            accept: "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose"
          },
          success: function(res) {
            var image = "";
            if (res.status == false) {
              image = imageURL + "img/dummy_mobile_store.jpg";
            } else {
              if (res.brandLogo == "") {
                image = imageURL + "img/dummy_mobile_store.jpg";
              } else {
                image = res.brandLogo;
              }
            }

            value["logo"] = image;

            if (value.position == "First Position") {
              firstPosition = value;
            }
            if (value.position == "Second Position") {
              secondPosition = value;
            }
            if (value.position == "Third Position") {
              thirdPosition = value;
            }
            if (value.position == "Fourth Position") {
              fourthPosition = value;
            }
            if (value.position == "Fifth Position") {
              fifthPosition = value;
            }
          },
          function(error) {
            console.log(JSON.stringify(error));
          }
        });
      });

      if (JSON.stringify(firstPosition) != "{}") {
        positions.push(firstPosition);
      }

      if (JSON.stringify(secondPosition) != "{}") {
        positions.push(secondPosition);
      }

      if (JSON.stringify(thirdPosition) != "{}") {
        positions.push(thirdPosition);
      }

      if (JSON.stringify(fourthPosition) != "{}") {
        positions.push(fourthPosition);
      }

      if (JSON.stringify(fifthPosition) != "{}") {
        positions.push(fifthPosition);
      }

      $(positions).each(function(index, value) {
        var itemPrice = value.item_price.toLocaleString();

        htmlBuyNow =
          htmlBuyNow +
          '<div class="row ">' +
          '<div class="col-xs-12 colStyle bynow">' +
          '<div class="col-xs-5">' +
          '<h6 style="color: #244f58;letter-spacing: 1px;">' +
          value.business_name +
          "</h6>" +
          "</div>" +
          '<div class="col-xs-7">' +
          '<a target="_blank" href="http://' +
          value.host_name +
          ".gadgetsinasia.com/store/Product-Details.html?product=" +
          value.business_item_id +
          '" class="btn  btn_success pull-right">Buy Now</a>' +
          '<span class="spnrg pull-right">$ ' +
          itemPrice +
          '<span class="spnrg" style="font-size: 12px;letter-spacing: 0.5px;">.000</span></span>' +
          "</div>" +
          "</div>" +
          "</div>";
      });

      $("#id_buyNowParent").append(htmlBuyNow);

      //        	$('#id_buyNowParent').append('<div class="row ">'
      //            		+'<div class="col-xs-12 colStyle bynow">'
      //            		+'<div class="col-xs-5">'
      //                    +'<h6 style="color: #244f58;letter-spacing: 1px;">Advertise Here</h6>'
      //                    +'</div>'
      //                    +'<div class="col-xs-7">'
      //                    // +'<a href="sellersignup.html?redirect=0" class="btn  btn_success pull-right">Buy</a>'
      //                    +'<a href="http://admin.gadgetsinasia.com/admin" class="btn  btn_success pull-right">Buy</a>'
    }
  });
}
