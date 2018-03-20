let Db = require("../Db");

module.exports =  class User extends Db{
	
	constructor ()
	{
		super();
		this.tableName ="users";
		this.fullName = null; 
		this.mobileNumber = null; 
		this.email = null; 
		this.password = null ; 
	}

}