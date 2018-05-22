
var mysql = require('mysql');
const path = require("path"); 
const  fs = require("fs"); 
var promise =require('promise');
/*let _this; */
import * as Utils from "../helper/utils";
module.exports = class Db {
	constructor() {

        this.tableName = null; 
		// this is to featch json object from the  json file of project level config "env.json"
       	const envFile = fs.readFileSync(path.join(__dirname,"../config/database.json")); 
       	let dbObject = JSON.parse(envFile); // parse file data into object format to use 
		this.connection = mysql.createConnection(dbObject.db); // creating db connection using settins of env.json "db"
		this.attributes = {}; 
        this.errors = {}; 

      /*  _this = this; */
    }


    setAttribute(key,value){//"mobile",1232
    	this.attributes[key].value = value; 
    }



    query(sql) {

    

    return new Promise((resolve,reject)=>{
       		
        let result;
		this.connection.connect();
		 
		this.connection.query(sql, (error, results, fields)=> {
                if (error)
                {
                     this.connection.end();
                    reject(error);
                }
                else
                {

                     this.connection.end();   
                    
                    resolve(results);           
                     //result=JSON.stringify(results);
                }



            }); 


		});
		
		// this.connection.end();
  //       console.log("___________________________________________________________");
		// console.log("query result ="+result);
  //       console.log("___________________________________________________________");
        

    }




    create (){    
        return new Promise((resolve,reject)=>{

            if(!this.tableName)
            {
                reject({status:"error",message:"Table for model not found"});
            }

            let sql = "insert into "+this.tableName+"(";
            let attributes = this.attributes; 
            sql = sql+Object.keys(this.attributes).join().toString()+") values(" ;
                    //sql="insert into users(EMAIL,pass,full_name,mobile") values("
            let values = "";

            console.log(this.attributes);
            let attributesKeysArray = Object.keys(this.attributes); 
            attributesKeysArray.forEach((key,i)=>{
                let comma = ",";
                if(i === (attributesKeysArray.length -1))
                {
                    comma ="";
                }
                values= values+ `"${attributes[key].value}"${comma}`;
                //console.log(attributes[key]);
                //values="s@g.c","123","shiva","1232" 
            }); 

            // var promise = new promise(function(resolve,reject){
            sql = sql+values+ ")";
            //"insert into users(EMAIL,pass,full_name,mobile") values("s@g.c","123","shiva","1232")

            this.query(sql).then((res)=>{
                resolve(res); 
            }).catch((error)=>{

                reject(error);
            });

    });  // Promise end

            
        //let sql = `insert into users(full_name,email,mobile,password) values("${fullName}","${email}","${mobile}","${password}")`;

    }



   delete (){

            let attributes = this.attributes;
            let t1 = attributes.id;
            
            console.log("t1="+t1);      
            let sql = "DELETE FROM "+this.tableName+" WHERE id ="+t1;
            
            var query = this.query; 
            return  new Promise(function(resolve,reject){

                if(typeof t1 == 'undefined' || !t1)
                {
                    reject({status:"error",message:"model is not found"});
                }

                query(sql).then(function(){

                    resolve({status:"success"});
                }).catch(function(error){

                     reject(error);
                });
         
            }); 

    }

            

           
    

           
    
    update ()
    {

        let attributes = this.attributes;
         let t1 = attributes.id;
         let fullname = attributes.full_name;
         let email = attributes.email;
         let mobile = attributes.mobile;
         let password = attributes.password;
        
         return new Promise((resolve,reject)=>{
                var sql = "UPDATE "+this.tableName+" SET full_name="+`"${fullname}"`+",email="+`"${email}"`+", mobile="+`"${mobile}"`+",password ="+`"${password}"`+"  WHERE id ="+t1;
                                                   
                 this.query(sql).then((data)=>{
                    resolve(data);
                 }).catch((error)=>{
                    reject(error); 
                 })
         }); 

    }  

    /*
        @function findOne
        @params   int id , function cb 
        This function will retrive single record by given id in first params and return data in 
        cb method. 
    */
 findOne(id){

        this.setAttribute("id",id);
                
        let attributes = this.attributes;
        let t1 = attributes.id;
        console.log("t1="+t1);  
        var sql;    
        sql = "SELECT * FROM "+this.tableName+" WHERE id ="+t1;

         return new Promise((resolve,reject)=>{

            this.query(sql).then(function(userdata){
                console.log("---------------",userdata[0]);
               resolve( userdata[0]);

            }).catch(function(error){

                reject(error);
            })

     });

     
    }; 


    /* 
        @function - findAll
        @params - function cb
        this will return db records for current model object

     */ 
    findAll(){
        var sql;
        sql = "SELECT * FROM "+this.tableName;
         
            var query = this.query; 
            return  new Promise(function(resolve,reject){
                query(sql).then(function(data){

                    resolve(data);
                }).catch(function(error){

                     reject(error);
                });
         
            }); 
    }
         


    load(obj)
    {
        if(!Utils.isEmpty(obj))
        {
            console.log(this.attributes);
            Object.keys(obj).forEach((key,i)=>{
                
                if(!Utils.isEmpty(this.attributes[key]))
                {
                    if(this.attributes[key].validation.indexOf("required") != -1 )
                    {
                        if(!Utils.isEmpty(obj[key]))
                        {
                           delete  this.errors[key];
                            this.attributes[key].value= obj[key];
                        }
                        else
                        {

                            this.errors[key] = key + " is required"; 
                        }
                    }
                    else
                    {
                        this.attributes[key].value= obj[key];     
                        
                       delete  this.errors[key]
                    }
                }
            });
            return true; 
        }
        else
        {
            return false; 
        }
    };

    validate(){
        console.log("in validation",_this.errors);
        if(!Utils.isEmpty(this.errors))
        {
            return false;
        }
        else
        {
            return true; 
        }
    }
};