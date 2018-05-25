
import url from 'url';
import * as utils from "../helper/utils.js"; 
import {User} from "../common/models/user.js"; 

export function create(req,res){	
    let model = new User();
    if(model.load(req.body.user) && model.validate())
    {                     
        model.create().then(()=>{	
            return res.redirect("/users"); 
        }).catch((error)=>{
            // this should be  implement into single place for all routing and exceptions         
            model.exceptions  = error;
            res.json(model.exceptions); 
            //res.render("user/create",{user:model}); 
        });
    }
    else
    {		
        res.render("user/create",{user:model}); 
    }
}


 export function update(req,res){
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;	
        let id = req.query.id;		
            if(typeof id !== 'undefined' && id !== 0)
            {
                let fullName = req.body.full_name;//shiva 
                let email = req.body.email;//s@g.c 
                let mobile = req.body.mobile_number; 
                let password = req.body.password;
           
    
                if( ! utils.isEmpty(fullName) && typeof email !== 'undefined' && typeof mobile !== 'undefined' && typeof password !== 'undefined')
                {
                     let model = new User();
                     
                     model.setAttribute("id",id);
                     model.setAttribute("email",email);//"email",s@g.c
                     model.setAttribute("password",password);//"password",123
                     model.setAttribute("full_name",fullName);
                         model.setAttribute("mobile",mobile);
                     model.update().then(()=>{	
                         return res.redirect("/users"); 
                     }).catch((error)=>{
                         console.log("error in update");
                     }); 
                 }
                 else
                 {		
                     let user = new User();
                     user.findOne(id).then((data)=>
                    {					
                        res.render("user/update",{user:data}); 
                        
                    }).catch((error)=>{
                        console.log(error);
                    });
                }
             }
             else
             {
                //user.query(sql); 
                res.redirect("/users"); 
            } 
        
    }




export function trash(req,res){
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;	
        let id = req.query.id;           
            let user = new User();
            user.setAttribute("id",id);//"email",s@g.c		 	
            user.delete().then(function(){    
            return res.redirect("/users");             
            }).catch(function(error){
    
            console.log("error",error); 
            //res.redirect("/users",error); 
    
            });   
}


export function index(req,res){
    let model = new User();
    model.findAll().then(function (userdata)
    {
        userdata = userdata;
        res.render("user/index",{users:userdata}); 
    }).catch(function(error){

        console.log(error);
    });
}