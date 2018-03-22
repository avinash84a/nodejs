var mysql = require('mysql');
const path = require("path"); 
const  fs = require("fs"); 

module.exports = class Db {

	constructor() {
        this.tableName = null; 
		// this is to featch json object from the  json file of project level config "env.json"
       	const envFile = fs.readFileSync(path.join(__dirname,"../config/env.json")); 
       	let env = JSON.parse(envFile); // parse file data into object format to use 
		this.connection = mysql.createConnection(env.db); // creating db connection using settins of env.json "db"
		this.attributes = {}; 
    }


    setAttribute(key,value){//"mobile",1232
    	this.attributes[key] = value; 
    }



    query(sql,cb) {
       		
		this.connection.connect();
		 
		this.connection.query(sql, function (error, results, fields) {
			console.log(error);
		  	if (error)
		  	{
		   		throw error;
			}
			else
			{
				console.log('The solution is: ', results);				
			}

		});
		 
		this.connection.end();
		cb();

    }


    create (cb){    
            //attrbute={
    //     "email":"s@g.c",
    //      "password":"123"
    //  "full_name":shiva
    //     "mobile":1232
    // }
    console.log(this);

     		let sql = "insert into "+this.tableName+"(";
    		let attributes = this.attributes; 
    		sql = sql+Object.keys(this.attributes).join().toString()+") values(" ;
                    //sql="insert into users(EMAIL,pass,full_name,mobile") values("
    		let values = "";
    		let attributesKeysArray = Object.keys(this.attributes); 
    		attributesKeysArray.forEach(function(key,i){

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

    		sql = sql+values+ ")";
            //"insert into users(EMAIL,pass,full_name,mobile") values("s@g.c","123","shiva","1232")
    		console.log(sql);
    		this.query(sql,function(){

    			cb();
    		});
    	//let sql = `insert into users(full_name,email,mobile,password) values("${fullName}","${email}","${mobile}","${password}")`;

    }

   delete (cb){

            //attrbute={
    //     "email":"s@g.c",
    //      "password":"123"
    //  "full_name":shiva
    //     "mobile":1232
    // }

    //console.log(this);
            let attributes = this.attributes;
            let t1 = attributes.id;
            
            console.log("t1="+t1);      
            let sql = "DELETE FROM "+this.tableName+" WHERE id ="+t1;
             
                                  
            console.log(sql);
            this.query(sql,function(){

                cb();
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
            let updateid = attributes.updateid;
           let sql;
      
            let values = "";
            let id;
            // let attributesKeysArray = Object.keys(this.attributes); 
            //  let arrid = parseInt(attributesKeysArray[0]);
            //     console.log(attributesKeysArray[0]);
            let attributesKeysArray = Object.keys(this.attributes);

            attributesKeysArray.forEach(function(key,i){
                    if(i===0){
                         id=attributes[key];
                    }
                    else{
                        let comma = ",";
                    
                        if(i === (attributesKeysArray.length -1))
                        {
                            comma ="";
                        }
                        values= values+" "+key+"="+`"${attributes[key]}"${comma}`;

                        }

                       
             });
             console.log(values);
             sql="UPDATE "+this.tableName+" SET "+values+" WHERE id="+id;
             console.log(sql);


            this.query(sql,function(){

                    cb();
                });   

    }  
         
};