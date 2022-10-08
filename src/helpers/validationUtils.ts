import Joi from "joi";
import { Request, Response, NextFunction} from 'express';


export const querySchema = Joi.object({
  login: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  age: Joi.number().min(4).max(130).required(),
});

export const usersGroupSchema = Joi.object({
  group_id : Joi.string().required(),
  user_ids : Joi.array().items(Joi.string().required())
})

export function errorResponse(schemaErrors : any) {
  const errors = schemaErrors.map((error : any) => {
    const { path, message } = error;
    return { path, message };
  });
  return {
    status: "failed",
    errors,
  };
}

export function validateSchema(schema : any) {
  return (req : Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });
    if (error) {
      res.status(400).json(errorResponse(error.details));
    } else {
      next();
    }
  };
}

export function validatePassword(user, password){
  if(password === user.password){
    console.log('inhere')
    return true;
  }
  return false;
}