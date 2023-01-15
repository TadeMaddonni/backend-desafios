import bcrypt from "bcrypt-nodejs";

export const encryptPassword = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const comparePasswords = (password, encryptedPassword) => {
	return bcrypt.compareSync(password, encryptedPassword);
};

console.log(
	comparePasswords(
		"tade1234",
		"$2a$10$/q9zOmsfeMsZ8D9Zz3jGxe/fpi0ELVbMnotHa1kaL.MyCRcIRQnTS"
	)
);
