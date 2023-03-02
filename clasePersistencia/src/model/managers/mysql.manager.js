class MySqlContainer {
	constructor(collection) {
		this.collection = collection;
	}

	async getById(id) {}

	async getAll() {}

	async save(product) {}

	async updateById(body, id) {}

	async deleteById(id) {}

	async deleteAll() {}
}

export { MySqlContainer };
