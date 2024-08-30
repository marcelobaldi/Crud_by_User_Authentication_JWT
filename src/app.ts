import express      from "express";    
import cookieParser from 'cookie-parser';    
import cors         from 'cors';                            
import dotenv       from 'dotenv';
import path         from 'path';
import { routes }   from "./routes";              

dotenv.config( {path: path.join(__dirname, '..', '.env')} );    

export class App{
    expressAPP:express.Application;                         
                        
    constructor(){
        this.expressAPP = express();		   
    	this.middleware();				         
    	this.routesProject();							   
    }

	private middleware(){
    	this.expressAPP.use(express.json());   
        this.expressAPP.use(cookieParser());    
       
        this.expressAPP.use(cors({
            origin: '*',
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",             
            allowedHeaders: ['X-PINGOTHER', 'Content-Type'],                                  
        }));              
	}

	private routesProject(){
        this.expressAPP.use(routes)                  
    }
}


