
console.log("aap.js");
var express = require("express");
const path = require("path");
var url = require('url');

var app  = express(); 

app.use(express.static("public"));

app.set("view engine","ejs"); 

app.set('views', path.join(__dirname, "themes/one"));

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 




app.get("/",function(req,res){

	res.render("site/index"); 
}); 










	





import * as site from "./server/routes/site.js";
app.post("/signup",site.signup); 
app.get("/signup",site.signup); 

app.get("/login",site.login); 

app.post("/login",site.login); 






// For User Model 
import * as user from "./server/routes/user.js";
app.get("/user/create",user.create); 
app.post("/user/create",user.create);
app.get("/user/update",user.update); 
app.post("/user/update",user.update);
app.get("/user/delete",user.trash); 

app.get("/users",user.index);
	




app.listen("3000");