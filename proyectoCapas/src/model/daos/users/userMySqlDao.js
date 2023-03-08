import { MySqlContainer } from "../../managers/mysql.manager.JS";

class UserMySqlDao extends MySqlContainer {
	constructor(model) {
		super(model);
	}
}

export { UserMySqlDao };
