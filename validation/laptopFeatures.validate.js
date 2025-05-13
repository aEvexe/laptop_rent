const Joi = require('joi');

const laptopFeatureValidation = (data) => {
    const schema = Joi.object({
        laptopId: Joi.number().integer().positive().required(),
        featureId: Joi.number().integer().positive().required(),
        value: Joi.string().max(255).required()
    });
    return schema.validate(data, { abortEarly: false });
};

module.exports = laptopFeatureValidation;
