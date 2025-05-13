const Joi = require('joi');

const customerValidation = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().max(255).required(),
        last_name: Joi.string().max(255).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().max(255).required(),
        address: Joi.string().max(255).required(),
        passport: Joi.string().max(255).required()
    });
    return schema.validate(data, { abortEarly: false });
};

module.exports = customerValidation;
