var connect = require('connect');
const express = require('express');
const expressNunjucks = require('express-nunjucks');
var app = express();
const isDev = app.get('env') === 'development';
var serveStatic = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var cors = require('cors');
var routes = require('./public/api/routes.js');
var storeroutes = require('./public/api/storeroutes.js');

var vhost = require('vhost');

app.use(bodyParser.json({ limit: '50mb', extended: true, type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, type: 'application/x-www-form-urlencoding' }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ limit: '50mb' }));

app.use('/', express.static(__dirname + 'public'));

app.use('/css', express.static(path.join(__dirname, 'public/css')));

app.use('/fonts', express.static(path.join(__dirname, 'public/fonts')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

app.use('/lib', express.static(path.join(__dirname, 'public/lib')));

app.use('/js2', express.static(path.join(__dirname, 'public/js2')));
app.use('/vendors', express.static(path.join(__dirname, 'public/vendors')));
app.use('/rs-plugin', express.static(path.join(__dirname, 'public/rs-plugin')));
//app.use('/store',express.static(path.join(__dirname, 'public/store')));

app.set('views', __dirname + '/public');


const njk = expressNunjucks(app, {
  watch: isDev,
  noCache: isDev
});

//app.set('view engine', 'ejs');

// app.get('//', routes.index);

// app.get('/articleHome.html', routes.articleHome);


app.get('//', routes.Home);
app.get('/NewArivals.html', routes.NewArivals);
app.get('/NewArivalslisting.html', routes.NewArivalslisting);
app.get('/Productdetail.html', routes.Productdetail);
app.get('/Register.html', routes.Register);
app.get('/header.html', routes.header);

app.get("/sitemap.xml", function (req, res, next) {
  res.sendFile(__dirname + '/public/sitemap.xml');
});

//app.get("/store/index.html", storeroutes.index);

//app.get('/sitemap.xml',express.static(__dirname + 'sitemap'));

// var stocks=require('./public/api/stock');

// app.post('/api/addStocks', stocks.addStocks);
// app.post('/api/buyStocks', stocks.buyStocks);
// app.get('/api/sellerData',stocks.sellerData);
// app.get('/api/buyerData',stocks.buyerData);
// app.get('/api/allSellersByProductId/:product_id',stocks.allSellerByProId);
// app.get('/api/allBuyersByProductId/:product_id',stocks.allBuyerProId);

// var store = connect();
// store.use(serveStatic('store'));
// app.use('/store', store);

// var portal = express();
// portal.use(serveStatic('portal'));
// app.use('/staffportal', portal);

// var superadmin = connect();
// superadmin.use(serveStatic('superadmin'));
// app.use('/superadmin', superadmin);

// var admin = connect();
// admin.use(serveStatic('business'));
// app.use('/admin', admin);

// var dashBoard = connect();
// dashBoard.use(serveStatic('dashBoard'));
// app.use('/dashBoard', dashBoard);

// var cnle = connect();
// cnle.use(serveStatic('cnle'));
// app.use('/cnle', cnle);

// live site
// app.use(vhost('www.gadgetsinasia.com', express.static(__dirname + 'public')));
// app.use(vhost('superadmin.gadgetsinasia.com', superadmin));
// app.use(vhost('admin.gadgetsinasia.com', admin));
//app.use(vhost('www.gadgetsinasia.com', portal));
// app.use(vhost('hinex.gadgetsinasia.com', portal ));
// app.use(vhost('hinex.gadgetsinasia.com', function (req, res) {
// handle req + res belonging to mail.example.com
// res.setHeader('Content-Type', 'text/plain')
// res.end('hello from mail!')
// }))

app.listen(6067, function () {
  console.log('CORS-enabled web server listening on port 6067')
})
console.log("Magic at 6067");
