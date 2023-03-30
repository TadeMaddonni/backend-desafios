"use strict";

/*
|--------------------------------------------------------------------------
| Http server
|--------------------------------------------------------------------------
|
| This file bootstrap Adonisjs to start the HTTP server. You are free to
| customize the process of booting the http server.
|
| """ Loading ace commands """
|     At times you may want to load ace commands when starting the HTTP server.
|     Same can be done by chaining `loadCommands()` method after
|
| """ Preloading files """
|     Also you can preload files by calling `preLoad('path/to/file')` method.
|     Make sure to pass relative path from the project root.
*/

const { Ignitor } = require("@adonisjs/ignitor");
const dotenv = require("dotenv");
dotenv.config();
const db_URL = process.env.DATABASE_URL;
const mongoose = require("mongoose");

new Ignitor(require("@adonisjs/fold"))
	.appRoot(__dirname)
	.fireHttpServer()
	.catch(console.error);

const connectDb = async () => {
	try {
		mongoose.set({ strictQuery: false });
		await mongoose.connect(db_URL);
		console.log("Database connected");
	} catch (error) {
		throw new Error(
			"An error occured while connecting to the database" + error
		);
	}
};
connectDb();
