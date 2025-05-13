const Joi = require('joi');

const laptopStockValidation = (data) => {
    const schema = Joi.object({
        laptop_id: Joi.number().integer().positive().required(),
        quantity: Joi.number().integer().min(0).required(),
        added_by: Joi.number().integer().positive().required(),
        added_at: Joi.date().required()
    });
    return schema.validate(data, { abortEarly: false });
};

module.exports = laptopStockValidation;
