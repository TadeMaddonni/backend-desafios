class Color {
	getRandom ()  {
		const number = Math.floor(Math.random() * 256);
		return number;
	};

	getRandomColor () {
		const Red = this.getRandom();
		const Green = this.getRandom();
		const Blue = this.getRandom();

		console.log(`rgb(${Red}, ${Green}. ${Blue})`);
	};
}

const colorRandom = new Color();

colorRandom.getRandomColor();
