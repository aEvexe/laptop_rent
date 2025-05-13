const Joi = require('joi');

const sellerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(255).required()
    });
    return schema.validate(data, { abortEarly: false });
};

module.exports = sellerValidation;
