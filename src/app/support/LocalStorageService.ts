import { Request, Response } from 'express';
import { UserInterface     } from '../interfaces/UserInterface';

export class LocalStorageService{
    static userLogged:Pick<UserInterface, 'id' | 'token'>;

    public static async set(req:Request, res:Response, user:UserInterface):Promise<void>{
        res.cookie('user', { id: user.id, token: user.token } ); 
        //res.send();
    }

    public static async get(req:Request, res:Response,):Promise<UserInterface>{
        let idGet:number   = req.cookies.user.id;
        let tokenGet:string = req.cookies.user.token;

        this.userLogged  = { id: idGet, token: tokenGet };
        return this.userLogged;
    }

    public static async delete(req:Request, res:Response,):Promise<void>{
        res.clearCookie('user');                    
        //res.end();     
    }
}

