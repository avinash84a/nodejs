
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



app.get("/welcome",function(req,res){
	

	res.render("site/welcome"); 
}); 

app.get("/update",function(req,res){
	

	res.render("site/update"); 
}); 



app.post("/signup",function(req,res){


		let fullName = req.body.full_name;//shiva 
		let email = req.body.email;//s@g.c 
		let mobile = req.body.mobile_number; 
		let password = req.body.password; 

		
		if(typeof fullName != 'undefined')
		{
			var user = require("./server/common/models/user.js");
		 	var model = new user();
		 	model.setAttribute("email",email);//"email",s@g.c
		 	model.setAttribute("password" , password);//"password",123
		 	model.setAttribute("full_name" , fullName);//"full_name",shiva
		 	model.setAttribute("mobile",mobile);//"mobile",1232
		 	model.create(function(){
		 		return res.render("site/welcome"); 
		 	}); 
		 }
		 else
		 {
		//user.query(sql); 
				res.render("site/signup"); 
		}
}); 

app.post("/welcome",function(req,res){


		let id = parseInt(req.body.t1);//shiva 
	
		
		if( id != 0)
		{
			var user = require("./server/common/models/user.js");
		 	var user = new user();

		 	user.setAttribute("id",id);//"email",s@g.c
		 	

		 	
		 	user.delete(function(){


		 		return res.render("site/index"); 
		 	}); 
		 }
		 else
		 {
		//user.query(sql); 
				res.render("site/welcome"); 
		}
}); 


app.post("/update",function(req,res){

		 let updateid = 4;
		let fullName = req.body.update_full_name;//shiva 
		let email = req.body.update_email;//s@g.c 
		let mobile = req.body.update_mobile_number; 
		let password = req.body.update_password;
		 var user = require("./server/common/models/user.js");
		 var user = new user();
		user.setAttribute("updateid",updateid);
		
		if(email!=null && email!="")
		{
			console.log("email"+email);
			user.setAttribute("email" ,email);//"full_name",shiva
			
		}
		if(password!=null && password!="")
		{
			console.log("pass"+password);
			user.setAttribute("password",password);//"mobile",1232
		}

		if(fullName!=null && fullName!="")
		{
			console.log("fullName"+fullName);
			user.setAttribute("full_name",fullName);//"email",s@g.c
		}

		if(mobile!=null && mobile!="")
		{
			console.log("mobile"+mobile);
			user.setAttribute("mobile",mobile);//"password",123
		}
		
		   

		 	//user.setAttribute("updateid",updateid);
		 	//user.setAttribute("update_full_name",fullName);//"email",s@g.c
		 	//user.setAttribute("update_mobile_number",mobile);//"password",123
		 	//user.setAttribute("update_email" ,email);//"full_name",shiva
		 	//user.setAttribute("update_password",password);//"mobile",1232

		 	
		 	user.update(function(){

		 		return res.render("site/update"); 
		 	}); 
		 
		
}); 






app.listen("3000");