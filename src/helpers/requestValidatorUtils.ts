import  jwt from 'jsonwebtoken';
import { Request, Response, NextFunction} from 'express';
import dotenv from "dotenv";
dotenv.config(); 

export const verifyToken =  (req : Request, res: Response, next : NextFunction) => {
    const { authorization } = req.headers;
    console.log(authorization)
    if(authorization){
        console.log('authorization', authorization)
        const token = authorization.split(' ')[1];
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err) => {
              if (err) {
                return res.status(403).json({ message: "Forbidden" });
              } else {
                next();
              }}
    )}
}else{
    res.status(401).send("Unauthorized");
}  
}