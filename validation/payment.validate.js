const Joi = require('joi');

const paymentValidation = (data) => {
    const schema = Joi.object({
        contract_id: Joi.number().integer().positive().required(),
        amount: Joi.number().precision(2).positive().required(),
        payment_date: Joi.date().required()
    });
    return schema.validate(data, { abortEarly: false });
};

module.exports = paymentValidation;
