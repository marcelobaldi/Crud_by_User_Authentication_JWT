import { RequestHandler } from "express";
import { JwtService     } from "../support/JwtService";

export const authMiddleware: RequestHandler = async(req, res, next) =>{
    //Headers: Check Object
    const { authorization } = req.headers;
    if(!authorization) {
        return res.status(400).json( {error: "User not authenticate."})
    }

    //Token: Create Array
    const tokenArray = authorization.split(' ');
    const bearer = tokenArray[0];
    const token = tokenArray[1];

    //Token: Validate (Bearer)
    if(bearer !== 'Bearer'){
        return res.status(400).json( {error: "User not authenticate."})
    }

    //Token: Validate (Token)
    let result = await JwtService.validate(token);

    //Authentication: Process
    if(typeof result === 'string'){
        return res.status(400).json( {error: "Invalid Token."})
    }
    return next();
}

/* 
Authentication
- Type:         Bearer Token.                   Bearer + Space + Token
- Get:          By Auth or By Headers.          I prefer by Headers;
*/

