const Joi = require('joi');

const categoryValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().max(255)
    });
    return schema.validate(data, { abortEarly: false });
};

module.exports = categoryValidation;
