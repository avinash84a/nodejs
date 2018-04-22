import url from 'url';
import {Utils} from "../helper/utils.js"; 

export function create(req,res){	
    var user = require("../common/models/user.js");
    var model = new user();

    if(model.load(req.body.user) && model.validate())
    {                     
        model.create().then(()=>{	
            return res.redirect("/users"); 
        }).catch((error)=>{
            console.log("error in update");
        }) 
    }
    else
    {		
        console.log(model.errors); 
        res.render("user/create",{user:model}); 
    }
};


 export function update(req,res){

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;	
        var id = req.query.id;		
            if(typeof id != 'undefined' && id != 0)
            {
                let fullName = req.body.full_name;//shiva 
                let email = req.body.email;//s@g.c 
                let mobile = req.body.mobile_number; 
                let password = req.body.password;
                var url_parts = url.parse(req.url, true);
                var query = url_parts.query;	
                var id = req.query.id; 
    
                if(typeof fullName != 'undefined' && typeof email != 'undefined' && typeof mobile != 'undefined' && typeof password != 'undefined')
                {
                    var user = require("../common/models/user.js");
                     var model = new user();
                     
                     model.setAttribute("id",id);
                     model.setAttribute("email",email);//"email",s@g.c
                     model.setAttribute("password",password);//"password",123
                     model.setAttribute("full_name",fullName);
                         model.setAttribute("mobile",mobile);
                     model.update().then(()=>{	
                         return res.redirect("/users"); 
                     }).catch((error)=>{
                         console.log("error in update");
                     }) 
                 }
                 else
                 {		
                    var user = require("../common/models/user.js");
                     var user = new user();
                     user.findOne(id).then((data)=>
                    {					
                        res.render("user/update",{user:data}); 
                        
                    }).catch((error)=>{
                        console.log(error)
                    });
                }
             }
             else
             {
                //user.query(sql); 
                res.redirect("/users"); 
            } 
        
    };




    export function trash(req,res){
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;	
            var id = req.query.id;
            var user = require("../common/models/user.js");
             var user = new user();
             user.setAttribute("id",id);//"email",s@g.c		 	
             user.delete().then(function(){
        
                console.log("resolve is call then function");
        
                 return res.redirect("/users"); 
             
             }).catch(function(error){
        
                 console.log("error",error); 
             
                //res.redirect("/users",error); 
        
             });   
        };


export function index(req,res){
    var user = require("../common/models/user.js");
    var user = new user();
    user.findAll().then(function (userdata)
    {
        userdata = userdata;
        res.render("user/index",{users:userdata}); 
    }).catch(function(error){

        console.log(error);
    });
};