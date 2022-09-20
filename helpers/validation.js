import Joi from 'joi';
// const validator = require('express-joi-validation').createValidator({})

export const querySchema = Joi.object({
  login: Joi.string().alphanum().min(3).max(30).required(),
  password : Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  age : Joi.number().min(4).max(130).required(),
})

export function errorResponse(schemaErrors){
    const errors = schemaErrors.map((error) => {
        let {path , message} = error;
        return {path, message};
    })
    return {
        status : 'failed',
        errors,
    };
};

export function validateSchema(schema){
    return (req, res , next) => {
        const {error} = schema.validate(req.body , {
            abortEarly : false,
            allowUnknown : false
                })
                if(error){
                    res.status(400).json(errorResponse(error.details));
                    
                }else{
                    next();
                }
    }
}

