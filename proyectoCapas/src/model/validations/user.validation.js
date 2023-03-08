import joi from "joi";

class UserValidation {
	static validateUser(user, nameRequired, maxLastName) {
		const userValidationSc = joi.object({
			nombre: nameRequired ? joi.string().required() : joi.string(),
			apellido: maxLastName
				? joi.string().max(maxLastName)
				: joi.string(),
			dni: joi.required(),
		});

		const { error } = userValidationSc.validate(user);
		if (error) {
			throw new Error(error.details[0].message);
		}
	}
}

export { UserValidation };
