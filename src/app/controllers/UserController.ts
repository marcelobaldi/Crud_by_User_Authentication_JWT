import { Request, Response 	 } from 'express';    
import * as yup 			   from 'yup';												
import { UserService 		 } from '../services/UserService';             
import { UserInterface 	   	 } from "../interfaces/UserInterface";       

export class UserController{
	//Methods: CUD
	async create (req:Request, res:Response):Promise<Object> { 
		//Data: Get
		let dataBody:any = req.body;

		//Data: Treatment and Validate Rules
		const validationRules:any = yup.object().shape({
			name:  yup.string().trim().required().min(2),
			email: yup.string().trim().required().email().min(7),
			pass:  yup.string().trim().required().min(6)
		})
		
		//Data: Validate Process
		try {
			var dataYup = await validationRules.validate(dataBody);	
		} catch(error){
			const yupError = error as yup.ValidationError;
			return res.status(400).json( { error: yupError.message } )
		}		

		//Save: Process
		let user:UserInterface = {name:dataYup.name, email:dataYup.email, pass_original:dataYup.pass} 
		let userService:any    = new UserService();
		let result:any         = await userService.create_S(user);

		if(typeof result == 'string'){ 
			return res.status(400).json({error: result}) 	 
		}else if(typeof result == 'object'){ 
			return res.status(200).json( { msg: "User created.", user: result } )
		}
	}
	
	 async update (req:Request, res:Response):Promise<Object>{ 
		//Param: Get, Treatment, Validate 		
		var paramId:string = req.params.id
		var id:number = Number(paramId);

		if(!Number.isInteger(id)){
			return res.status(400).json( { error: "Invalid parameter." } )
		}

		//Data: Get, Treatment, Validate Rules
		var dataBody:any   = req.body;
		
		const validationRules:any = yup.object().shape({
			name:  yup.string().trim().required().min(1),
			email: yup.string().trim().required().email().min(5),
			pass:  yup.string().trim().required().min(6)
		})
		
		//Data: Validate Process
		try {
			var dataYup = await validationRules.validate(dataBody);	
		} catch(error){
			const yupError = error as yup.ValidationError;
			return res.status(400).json( { error: yupError.message } )
		}		
		
		//Update: Process
		let user:UserInterface = {name:dataYup.name, email:dataYup.email, pass_original:dataYup.pass} 
		let userService:any    = new UserService();
		let result:any         = await userService.update_S(id, user);

		if(typeof result == 'string'){ 
			return res.status(400).json({error: result}) 	 
		}else if(typeof result == 'object'){ 
			return res.status(200).json( { msg: "User updated.", user: result } )
		}	
	}

	async delete (req:Request, res:Response):Promise<Object>{ 
		//Id Process: Get and Treatment
		var paramId:string = req.params.id
		var id:number = Number(paramId);
		
		if(!Number.isInteger(id)){
			return res.status(400).json( { error: "Invalid parameter." } )
		}

		//Delete Process
		let userService:any = new UserService();
		let result:any      = await userService.delete_S(id);

		if(typeof result == 'string'){ 
			return res.status(200).json({error: result}) 	 
		}else if(typeof result == 'object'){ 
			return res.status(200).json( { msg: "User deleted.", user: result } )
		}	
	}

	//Methods: Query
	async findAll (req:Request, res:Response):Promise<Object>{ 
		let userService:any = new UserService();
		let result:any      = await userService.findAll_S()

		if(typeof result == 'string'){ 
			return res.status(400).json({error: result}) 	 
		}
		
		if(Object.keys(result).length == 0){
			return res.status(200).json( { msg: "Doesn't exist users." } )
		}
		
		if(typeof result == 'object'){ 
			return res.status(200).json( { users: result } )
		}	
	}

	async findById (req:Request, res:Response):Promise<Object>{ 
		//Id Process: Get and Treatment
		var paramId:string = req.params.id
		var id:number = Number(paramId);
		
		if(!Number.isInteger(id)){
			return res.status(400).json( { error: "Invalid parameter." } )
		}

		//Find Process
		let userService:any = new UserService();
		let result:any      = await userService.findById(id);

		if(typeof result == 'string'){ 
			return res.status(400).json({error: result}) 	 
		}else if(typeof result == 'object'){ 
			return res.status(200).json( { user: result } )
		}	
	}
}

