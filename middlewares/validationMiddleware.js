const Joi = require('joi');
// const { BadRequestError } = require('../helpers/errors');

// todo- use custom errors instead return res.
// todo use validMiddleware(schemaOfValidate)

// Contacts schemes
const newContactSchema = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(6).max(14).pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/).required(),
})
const updateContactSchema = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).min(3).max(30).allow(""),
    email: Joi.string().email().allow(""),
    phone: Joi.string().min(6).max(14).pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/).allow(""),
})

// Auth schemes
const authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})
const emailSchema = Joi.object({
    email: Joi.string().email().required(),
})

const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business'),
})

module.exports = {
    addContactValidation: (req, res, next) => { 
        const validationResult = newContactSchema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ "message": validationResult.error.details })
        }
        next()
    },

    updateContactValidation: (req, res, next) => { 
        const { name, email, phone } = req.body;
        if (name === '' && email === '' && phone === '') {
            return res.status(400).json({ "message": "missing fields (at least one of the fields should be filled)" })
        }

        const validationResult = updateContactSchema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ "message": validationResult.error.details })
        }
        next()
    },
    
    updateStatusValidation: (req, res, next) => { 
        const { favorite } = req.body;
        if (favorite === '') {
            return res.status(400).json({ "message": "missing field favorite" })
        }
        next()
    },

    authValidation: (req, res, next) => { 
        const { email, password } = req.body;

        const validationResult = authSchema.validate({ email, password }, { abortEarly: false });
        if (validationResult.error) {
            // throw new BadRequestError(JSON.stringify({ "message": validationResult.error.details }))
            return res.status(400).json({ "message": validationResult.error.details })
        }
        next()
    }, 
    emailValidation: (req, res, next) => { 
        const { email } = req.body;
        
        const validationResult = emailSchema.validate({ email });
        if (validationResult.error) {
            // throw new BadRequestError(JSON.stringify({ "message": validationResult.error.details }))
            return res.status(400).json({ "message": validationResult.error.details })
        }
        next()
    }, 

    subscriptionValidation: (req, res, next) => { 
        const validationResult = subscriptionSchema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ "message": validationResult.error.details })
        }
        next()
    }
}
