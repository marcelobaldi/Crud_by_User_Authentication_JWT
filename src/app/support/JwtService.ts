import * as jwt from 'jsonwebtoken';

export class JwtService{
    static async generate(userId:number | string):Promise<any>{
        let projectToken = process.env.PROJECT_TOKEN;
        return jwt.sign({id: userId}, projectToken, { expiresIn: '3d'});
    };
    
    static async validate(userToken:string):Promise<any>{    
        try{
            const result = jwt.verify(userToken, process.env.PROJECT_TOKEN);
            if(typeof result === 'string'){ return 'INVALID_TOKEN' }
            return result;
    
        }catch(error){
            return 'INVALID_TOKEN';
        }
    }
}

/* 
Generate
- Comand:               sign;
- Necessary Data:       User Logged ID   (Number or String) and ProjectToken (String);
- Optional Data:        Expiration Time  (to be necessary make login again);
- Return:               UserToken        (object);

Validate
- Comand:               verify; 
- Necessary Data:       UserToken + ProjectToken
- Retorno:              Ok(Objeto) or Error(String);                         
*/

