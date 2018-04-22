
var mysql = require('mysql');
const path = require("path"); 
const  fs = require("fs"); 
var promise =require('promise');
let _this; 
module.exports = class Db {
	constructor() {
    
        this.tableName = null; 
		// this is to featch json object from the  json file of project level config "env.json"
       	const envFile = fs.readFileSync(path.join(__dirname,"../config/env.json")); 
       	let env = JSON.parse(envFile); // parse file data into object format to use 
		this.connection = mysql.createConnection(env.db); // creating db connection using settins of env.json "db"
		this.attributes = {}; 

        _this = this; 
    }


    setAttribute(key,value){//"mobile",1232
    	_this.attributes[key] = value; 
    }



    query(sql) {

    

    return new Promise((resolve,reject)=>{
       		
        let result;
		_this.connection.connect();
		 
		_this.connection.query(sql, (error, results, fields)=> {
	


                if (error)
                {
                    console.log("error in query")
                     _this.connection.end();
                    reject(error);
                }
                else
                {

                    // console.log("type of results : "+typeof(results));
                    console.log('The solution is: ', results);
                     _this.connection.end();
                     result=JSON.stringify(results);
                    resolve(result);                
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
            let attributesKeysArray = Object.keys(this.attributes); 
            attributesKeysArray.forEach((key,i)=>{

                let comma = ",";
                console.log(i,attributesKeysArray.length);
                if(i === (attributesKeysArray.length -1))
                {
                    comma ="";
                }
                values= values+ `"${attributes[key]}"${comma}`;
                //console.log(attributes[key]);
                //values="s@g.c","123","shiva","1232" 
            }); 

            // var promise = new promise(function(resolve,reject){
            sql = sql+values+ ")";
            //"insert into users(EMAIL,pass,full_name,mobile") values("s@g.c","123","shiva","1232")
            console.log(sql);
            // if (true) {}
            // resolve(sql);
            // reject("NOthing");
            // return promise;
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

            

           
    

           
    
    update (cb)
    {

            //attrbute={
    //     "email":"s@g.c",
    //      "password":"123"
    //  "full_name":shiva
    //     "mobile":1232
    // }

    //console.log(this);
            let attributes = this.attributes;
             let t1 = attributes.id;
             let fullname = attributes.full_name;
             let email = attributes.email;
             let mobile = attributes.mobile;
             let password = attributes.password;
           //  UPDATE `users` SET `id`=[value-1],`full_name`=[value-2],`mobile`=[value-3],`email`=[value-4],`password`=[value-5] WHERE 1
              var sql = "UPDATE "+this.tableName+" SET full_name="+`"${fullname}"`+",email="+`"${email}"`+", mobile="+`"${mobile}"`+",password ="+`"${password}"`+"  WHERE id ="+t1;
             //let sql = "SELECT * FROM "+this.tableName+" WHERE id ="+t1;
             
                                  
            console.log(sql);
             this.query(sql,function(){

                 cb();
             });
     

            // let updateid = attributes.updateid;
         //  let sql;
      
           // let values = "";
            //let id;
          //  let attributesKeysArray = Object.keys(this.attributes); 
            //  let arrid = parseInt(attributesKeysArray[0]);
            //     console.log(attributesKeysArray[0]);
            //let attributesKeysArray = Object.keys(this.attributes);

            // attributesKeysArray.forEach(function(key,i){
            //         if(i===0){
            //              id=attributes[key];
            //         }
            //         else{
            //             let comma = ",";
                    
            //             if(i === (attributesKeysArray.length -1))
            //             {
            //                 comma ="";
            //             }
            //             values= values+" "+key+"="+`"${attributes[key]}"${comma}`;

            //             }

                       
             // });
            // console.log(values);
            //  sql="SELECT * FROM "+this.tableName+, function (err, result, fields) {
            //     if (err) throw err;
            //     console.log(result);
            //     }
            //  console.log(sql);


            // this.query(sql,function(){

            //         cb();
            //     });   

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

        return this.query(sql); 

       /*this.query(sql).then(function(userdata){

            cb(null,userdata[0]);
        }).catch(function(error){

            console.log(error); 
        })
     */
    }


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
         
};