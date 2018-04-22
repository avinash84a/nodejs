import Db from "../Db";

module.exports =  class User extends Db{	
	constructor ()
	{
		super();
		this.id = 0;
		this.tableName ="users";

		this.attributes = {
			id:{
				name:"id",
							
			},
			full_name:{
				name:"full_name",
				validation:[
					"required"
				]
			},
			email:{
				name:"email",
				validation:[
					"required"
				]
			},
			mobile:{
				name:"mobile",
				validation:[
					"required"
				]
			},
			password:{
				name:"password",
				validation:[
					"required"
				]
			}
		};
	}
};