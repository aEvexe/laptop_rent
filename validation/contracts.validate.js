const Joi = require('joi');

const contractValidation = (data) => {
    const schema = Joi.object({
        customer_id: Joi.number().integer().positive().required(),
        laptop_id: Joi.number().integer().positive().required(),
        first_payment: Joi.number().precision(2).min(0).required(),
        duration: Joi.number().integer().min(1).required(),
        seller_id: Joi.number().integer().positive().required(),
        monthly_payment: Joi.number().precision(2).positive().required(),
        payments_remaining: Joi.number().integer().min(0).required(),
        next_payment_date: Joi.date().required(),
        remaining_balance: Joi.number().precision(2).min(0).required()
    });
    return schema.validate(data, { abortEarly: false });
};

module.exports = contractValidation;
