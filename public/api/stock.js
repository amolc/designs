var http = require("http");
var mysql = require("mysql");

var db = mysql.createPool({
  database: "80mobileshop",
  user: "root",
  password: "10gXWOqeaf",
  host: "db.80startups.com"
});

var CRUD = require("mysql-crud");
var addStockCRUD = CRUD(db, "add_stocks");
var buyStockCRUD = CRUD(db, "buy_stocks");

exports.addStocks=function(req,res){
    
   console.log(req.body);
    addStockCRUD.create({
        name:req.body.name,
        number:req.body.number,
        email:req.body.email,
        qty:req.body.qty,
        price:req.body.price,
        product_id:req.body.product_id,
        productName:req.body.productName,
        status:'pending'
    },function(err,val){
        if(!err){
            res.json(val);
            console.log('stock added in the db');
        }else{
            console.log(err);
        }
    })
}

exports.buyStocks=function(req,res){
    
   console.log(req.body);
    buyStockCRUD.create({
        name:req.body.name,
        number:req.body.number,
        email:req.body.email,
        qty:req.body.qty,
        price:req.body.price,
        product_id:req.body.product_id,
        status:'pending',
        location:req.body.location,
        productName:req.body.productName
    },function(err,val){
        if(!err){
            res.json(val);
            console.log('stock added in the db');
        }else{
            console.log(err);
        }
    })
}

exports.sellerData=function(req,res){
    addStockCRUD.load({},function(err,val){
        if(!err){
            console.log(val);
            res.json(val)
        }else{
            console.log(err);
        }
    })
}
exports.buyerData=function(req,res){
    buyStockCRUD.load({},function(err,val){
        if(!err){
            console.log(val);
            res.json(val)
        }else{
            console.log(err);
        }
    })
}
exports.allSellerByProId=function(req,res){
    addStockCRUD.load({product_id:req.params.product_id},function(err,val){
        if(!err){
            res.json(val);
        }else{
            console.log(err);
        }
    })
}
exports.allBuyerProId=function(req,res){
    buyStockCRUD.load({product_id:req.params.product_id},function(err,val){
        if(!err){ 
            res.json(val)
        }else{
            console.log(err);
        }
    })
}