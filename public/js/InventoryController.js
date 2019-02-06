var app = angular.module("tradeexchangeApp", []);
app.controller("InventoryController", function ($scope, $http) {
  var product_brand;
  // var baseurl = "https://api.fountaintechies.com/api/";
  // var imageURL = "https://api.fountaintechies.com/assets/";

  $scope.productBrand = function (val) {
    product_brand = val;
  };

  $scope.addInventory = function (value) {
    if (value.product_new == undefined) {
      var body = {
        product_brand: value.brand,
        product_title: value.productName,
        product_type: value.productType,
        product_usd: value.product_usd,
        seller_id: value.seller_id,
        product_qty: value.product_qty,
        warehouse: value.warehouse
      }
    } else {
      var body = {
        product_brand: value.brand,
        product_title: value.product_new,
        product_type: value.productType,
        product_usd: value.product_usd,
        seller_id: value.seller_id,
        product_qty: value.product_qty,
        warehouse: value.warehouse,
        product_weight: value.product_weight
      }
    }
    console.log(body)
    $http.post(baseurl + "addStocks", body).then(
      function (res) {
        location.href = "index.html";
      },
      function (error) {
        console.log("unable to add Inventory");
      }
    );
  };
  $scope.buyInventory = function (value) {
    var body = {
      product_brand: value.brand,
      product_title: value.productName,
      product_type: value.productType,
      product_usd: 'US $'+value.product_usd,
      buyer_id: value.buyer_id,
      product_qty: value.product_qty,
      destination:value.destination
    }
    console.log(body);
    $http.post(baseurl + "buyStocks", body).then(
      function (res) {
        location.href = "orderconfermation.html";
      },
      function (error) {
        console.log("Eroor! Unable to buy Inventory");
      }
    );
  };

  $scope.productType = function () {
    console.log(baseurl + "productTypeByBrandFilter/" + product_brand);
    $http({
      method: "GET",
      url: baseurl + "productTypeByBrandFilter/" + product_brand
    }).then(
      function (response) {
        $scope.allProductType = response.data;
      },
      function (error) {
        console.log("error while fetching data for brand filter");
      }
    );
  }
  $scope.productTitle = function () {
    $http({
      method: "GET",
      url: baseurl + "productTitleByBrandFilter/" + product_brand
    }).then(
      function (response) {
        $scope.allProductTitle = response.data;
      },
      function (error) {
        console.log("error while fetching data for brand filter");
      }
    );
  }
  $scope.brand = function () {
    $http({
      method: "GET",
      url: baseurl + "allBrands"
    }).then(
      function (response) {
        $scope.allBrands = response.data;
      },
      function (error) {
        console.log("Error! Please check API code of all distinct brand");
      }
    );
  };


  $scope.order = function (value) {
    var url = location.href;
    var url_param = url.split("?brand=");
    var body = {
      name: value.name,
      number: value.number,
      cc: value.cc,
      email: value.email,
      qty: value.qty,
      product_id: url_param[1]
    }
    $http.post(baseurl + 'orderInventory', body).then(function (res) {
      location.href = "orderconfermation.html";
    }, function (error) {
      console.log("Error! Please check API code for order Inventory");
    })
  }

 
  $scope.trader = function (value) {
    var body = {
      company_name: value.name,
      contact: value.number,
      country: value.country,
      email: value.email,
    }
    $http.post(baseurl + "addTrader", body).then(function (res) {
      location.href = "traders_fountaintechnoliges.html";
    }, function (error) {
      console.log(error);
      console.log('Error! Please Check Api Code for add trader');
    })
  }
});
