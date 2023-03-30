const dotenv = require("dotenv");
dotenv.config();
const options = {
	database_URL: process.env.DATABASE_URL,
};

module.exports = options;
console.log(options);
