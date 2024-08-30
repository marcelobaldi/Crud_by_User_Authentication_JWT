import { Request, Response 	 } from 'express';    
import * as yup 			  from 'yup';												
import { LoginService		 } from '../services/LoginService';      
import { UserInterface 	   	 } from "../interfaces/UserInterface";       
import { LocalStorageService } from '../support/LocalStorageService';
import { JwtService 		 } from '../support/JwtService';

export class LoginController{
	async login (req:Request, res:Response):Promise<Object>{ 
		//Data: Get
		let dataBody:any = req.body;

		//Data: Treatment and Validation Rules
		const validationRules:any = yup.object().shape({
			email: yup.string().trim().required().email().min(5),
			pass:  yup.string().trim().required().min(6)
		})
		
		//Data: Validation Process 
		try {
			var dataYup = await validationRules.validate(dataBody);	
		} catch(error){
			const yupError = error as yup.ValidationError;
			return res.status(400).json( { error: yupError.message } )
		}		

		//Login: Process (LoginCheck | GenerateToken | UserLocalStorage)
		let user:UserInterface = { email: dataYup.email, pass_original: dataYup.pass } 
		let loginService:any   = new LoginService();
		let result:any 		   = await loginService.login_S(user);

		if(!result){ return res.status(400).json({error: "Login invalid."}) }
	
		const generateToken = await JwtService.generate(result.id);
	
		let userLogged:UserInterface = {id: result.id, token: generateToken}
		await LocalStorageService.set(req, res, userLogged);
		return res.status(200).json( {result: true, token: generateToken } ); 	 
	}

	async logout (req:Request, res:Response):Promise<Object>{ 
		await LocalStorageService.delete(req, res);
		return res.end("Logout sucess.");
	}
}

