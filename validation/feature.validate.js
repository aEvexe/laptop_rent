const Joi = require('joi');

const featureValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        isMain: Joi.boolean().required(),
        value_type: Joi.string().valid('string', 'number', 'boolean', 'date').required()
    });
    return schema.validate(data, { abortEarly: false });
};

module.exports = featureValidation;
