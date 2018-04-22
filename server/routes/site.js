import url from 'url';

export function signup(req,res){


    let fullName = req.body.full_name;//shiva 
    let email = req.body.email;//s@g.c 
    let mobile = req.body.mobile_number; 
    let password = req.body.password; 

    
    if(typeof fullName != 'undefined')
    {
        var user = require("../common/models/user.js");
        var model = new user();
        model.setAttribute("email",email);//"email",s@g.c
        model.setAttribute("password" , password);//"password",123
        model.setAttribute("full_name" , fullName);//"full_name",shiva
        model.setAttribute("mobile",mobile);//"mobile",1232
        
        model.create().then(function(res){
        
        res.render("site/welcome"); 

        }).catch(function(error){
            console.log(error);
                    res.render("site/signup"); 
        }); 
    }
    else
    {
        res.render("site/signup"); 
    }
    
}



export function login(req,res){


    let email = req.body.email;
    let password = req.body.password;
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;	
    var id = req.query.id;
    var qemail = req.query.email;
    var pass = req.query.password;
    
    if(typeof email != 'undefined' && typeof email == typeof qemail && typeof password != 'undefined' && typeof password == typeof pass )
    {
        var user = require("../common/models/user.js");
         var model = new user();
         model.setAttribute("id",id);
         model.setAttribute("email",email);//"email",s@g.c
         model.setAttribute("password" , password);//"password",123
         
         
         model.login(function(){
             return res.render("site/welcome"); 
         }); 
     }
     else
     {
        res.render("site/login"); 
    }
}