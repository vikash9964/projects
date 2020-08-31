const env = process.env.NODE_ENV || "development";

const development = {

	mode:"development",
	app:{
		name:process.env.APP || "dev",
		port : process.env.PORT || 8000,
		baseUrl : "http://localhost:8000",
		public_path : "http://localhost/service/public",
	},
	db:{
		username:"root",
		password : "",
		database : "services",
		host : "localhost",
		dialect : "mysql",
		OperatorsAliases : false,
	}
	
};

const production = {

	mode:"production",
	app:{
		name:"",
		port : "",
		baseUrl : "",
		public_path : "",
	},
	db:{
		username:"",
		password : "",
		database : "",
		host : "",
		dialect : "mysql",
		OperatorsAliases : false,
	}
	
};

const config = {
	development,
	production
}

CONFIG = config[env];

module.exports = config[env];