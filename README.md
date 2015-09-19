#Simple http-server with drawer v1.0.0 Documentation

This module is simple http framework which contains drawer for handling and organizing files by file extensions. 
Using drawer, file can be written by `/write/filename` url and the file will be stored into the folder where file extension has matched. Also, file can be read by '/read/filename' simply.
It is also able to show the list of files in drawer


## List of Contents
* http framework
  - router.get(route, callback)
  - router.post(route, callback)
  - router.put(route, callback)
  - router.patch(route, callback)
  - router.delete(route, callback)
  - router.listen(router, port)

* drawer
  - drawer.init(dir)
  - drawer.readURL(url,req,res)


## HTTP FRAMEWORK

### router.listen(router, port)
It will be create server to listen.

#### Example
```
var Router = require('httpframework');
router = Router();
router.listen(router.route, 3000);
```


## drawer

### drawer.init(dir)
Initialized drawer in local directory. 
It will be created photo/musin/documentation/javascript/html/etc as sub-folder in drawer automatically.

#### Example
```
var Drawer = require('drawer');
var drawer = new Drawer();
drawer.init(__dirname);
```
It will be created drawer folder which has sub-folders(photo/documentation/javascript/html/ect) in __dirname.

### drawer.readURL(url,req,res)

###drawer.filelist(file-type);
Show the list of files which has been sorted by extenstions. 
```
var Drawer = require('drawer');
var drawer = new Drawer();
drawer.filelist('json');
```
It will be shown the list of json you have in drawer.