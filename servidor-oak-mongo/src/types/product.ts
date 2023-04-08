import { ObjectId } from "../../depts.ts";

export interface Product {
	_id: ObjectId;
	name: string;
	price: number;
}
