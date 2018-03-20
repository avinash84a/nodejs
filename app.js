
var express = require("express");
const path = require("path");
var app  = express(); 

app.use(express.static("public"));

app.set("view engine","ejs"); 

app.set('views', path.join(__dirname, "themes/one"));

app.get("/",function(req,res){
	

	res.render("site/index"); 
}); 

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



app.get("/login",function(req,res){
	

	res.render("site/login"); 
}); 




app.get("/signup",function(req,res){
	

	res.render("site/signup"); 
}); 




app.post("/signup",function(req,res){


		let fullName = req.body.full_name;//shiva 
		let email = req.body.email;//s@g.c 
		let mobile = req.body.mobile_number; 
		let password = req.body.password; 

		
		if(typeof fullName != 'undefined')
		{
			var user = require("./server/common/models/user.js");
		 	var user = new user();

		 	user.setAttribute("email",email);//"email",s@g.c
		 	user.setAttribute("password" , password);//"password",123
		 	user.setAttribute("full_name" , fullName);//"full_name",shiva
		 	user.setAttribute("mobile",mobile);//"mobile",1232

		 	
		 	user.create(function(){


		 		return res.render("site/welcome"); 
		 	}); 
		 }
		 else
		 {
		//user.query(sql); 
				res.render("site/signup"); 
		}
}); 









app.listen("3000");