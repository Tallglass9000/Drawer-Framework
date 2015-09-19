var Router = require('./httpframework.js');
var url = require('url');
var Drawer = require('./drawer.js');
var fs = require('fs');

var router = Router();
var drawer = new Drawer();

drawer.init(__dirname);

router.post('/write/hello.json', function(req, res) {
    drawer.readURL(req.url,req,res);
});

router.get('/read/hello.txt', function(req, res) {
  drawer.readURL(req.url,req,res);
});


router.listen(router.route, 3000);
