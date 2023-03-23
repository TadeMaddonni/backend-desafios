import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { root } from "../services/routes.graphql.service.js";

// Construcción del esquema de GraphQL
const graphqlSchema = buildSchema(`
	type User{
		_id: String, 
		email: String, 
		password: String,
		version: Int
		
	}
	type Product{
		_id: String,
		name: String,
		price: Int, 
		thumbnail: String
	}

	input UserInput{
		email: String,
		password: String
	}

	input ProductInput{
		name: String,
		price: Int,
		thumbnail: String
	}

	type Query{
		getProducts: [Product], 
		getUserById(id: String): User,
	}
	
	type Mutation{
		addProduct(product: ProductInput): String
		addUser(user: UserInput): User
	}
`);

export const graphqlController = () => {
	return graphqlHTTP({
		schema: graphqlSchema,
		rootValue: root,
		graphiql: true,
	});
};
