import { MySqlContainer } from "../../managers/mysql.manager.JS";

class ProductMySqlDao extends MySqlContainer {
	constructor(model) {
		super(model);
	}
}

export { ProductMySqlDao };
