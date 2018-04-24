
import express from "express";
import path from  "path";
import url  from 'url';
import fs  from 'fs';
import bodyParser from 'body-parser';
 var thor = require("thor"); 

var app  = express(); 
app.use(express.static("public"));
app.set("view engine","ejs"); 
app.set('views', path.join(__dirname, "themes/one"));


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
  
let config = fs.readFileSync(path.join(__dirname,"/server/config/env.json"));
app.config  =  JSON.parse(config);
let db =   fs.readFileSync(path.join(__dirname,"/server/config/database.json"));

app.db = JSON.parse(db); 
thor.run(app); 

