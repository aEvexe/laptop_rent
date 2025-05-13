const Joi = require('joi');

const laptopValidation = (data) => {
    const schema = Joi.object({
        model: Joi.string().max(255).required(),
        brand_id: Joi.number().integer().positive().required(),
        category_id: Joi.number().integer().positive().required(),
        price: Joi.number().precision(2).positive().required()
    });
    return schema.validate(data, { abortEarly: false });
};

module.exports = laptopValidation;