const Joi = require('joi');

const brandValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().max(255)
    })
    return schema.validate(data, { abortEarly: false });
}


module.exports = brandValidation;