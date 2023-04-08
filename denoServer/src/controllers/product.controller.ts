import {
	Context,
	helpers,
	config,
	MongoClient,
	ObjectId,
} from "../../depts.ts";
import { Product } from "../types/product.ts";

const { MONGO_URL, DATABASE_NAME } = config();

//conexion de mongo
const client = new MongoClient();
try {
	await client.connect(MONGO_URL);
	console.log("conexion a la base de datos exitosa!");
} catch (error) {
	console.log(error);
}

const db = client.database(DATABASE_NAME); ///instancia de la base de datos
const productModel = db.collection<Product>("products");

export const findProducts = async (ctx: Context) => {
	try {
		const users = await productModel.find().toArray();
		ctx.response.status = 200;
		ctx.response.body = { status: "success", data: users };
	} catch (error) {
		ctx.response.status = 401;
		ctx.response.body = `Hubo un error ${error}`;
	}
};

export const findProductsById = async (ctx: Context) => {
	try {
		const { id } = helpers.getQuery(ctx, { mergeParams: true }); //req.params.id;
		const product = await productModel.findOne({ _id: new ObjectId(id) });
		ctx.response.status = 200;
		ctx.response.body = { status: "success", data: product };
	} catch (error) {
		ctx.response.status = 401;
		ctx.response.body = `Hubo un error ${error}`;
	}
};

export const createProduct = async (ctx: Context) => {
	try {
		const body = await ctx.request.body().value;
		const productCreated = await productModel.insertOne(body);
		ctx.response.status = 200;
		ctx.response.body = {
			status: "success",
			data: productCreated,
			message: "product has been created",
		};
	} catch (error) {
		ctx.response.status = 401;
		ctx.response.body = `Hubo un error ${error}`;
	}
};
