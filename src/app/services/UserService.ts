import { UserRepository } from "../repositories/UserRepository";
import { UserInterface } from "../interfaces/UserInterface";
import { CryptographyService } from "../support/CryptographyService";

export class UserService extends UserRepository{
    //Methods: CUD
    async create_S(user:UserInterface):Promise<string | UserInterface>{
        //Email: Check
        let userResult:UserInterface = await this.findByEmail_R(user.email);
        if(typeof userResult == 'object' && userResult != null){
            return "This email already exists." as string;
        }

        //Password: Cryptography
        user.pass_encrypted = await CryptographyService.generate(user.pass_original);

        //Save: Process
        try{
            let userRepository        = new UserRepository();
            let result:UserInterface  = await userRepository.create_R(user);
            return result;
        }catch(error){
            if(error.code != null){
                if (error.code === "P2002") {
                    return "This email already exists." as string;
                }else{
                    return "Error occurred." as string;
                }
            }
        }
    }

    async update_S(id:number, user:UserInterface):Promise<string | UserInterface>{
        //Id: Check
        let userResult = await this.findById_R(id);
        if(userResult == null){
            return "This id not exist." as string;
        }

        //Password: Cryptography
        user.pass_encrypted = await CryptographyService.generate(user.pass_original);

        //Update: Process
        try{
            let userRepository = new UserRepository();
            let result:any     = await userRepository.update_R(id, user);
            return result;
        }catch(error){
            if(error.code != null){
                return "Error occurred." as string;
            }
        }
    }

    async delete_S(id:number):Promise<string | UserInterface>{
        //Check Id
        let userResult = await this.findById_R(id);
        if(userResult == null){
            return "This id not exist." as string;
        }

        //Delete Process
        try{
            let userRepository = new UserRepository();
            let result:UserInterface = await userRepository.delete_R(id);
            return result;
        }catch(error){
            if(error.code != null){
                return "Error occurred." as string;
            }
        }
    }

    //Methods: Query
    async findAll_S():Promise<any>{
        try{
            let userRepository = new UserRepository();
            let result:any     = await userRepository.findAll_R();
            return result;
        }catch(error){
            if(error.code != null){
                return "Error occurred." as string;
            }
        }
    }

    async findById(id:number):Promise<string | UserInterface>{
        //Check Id
        let userResult = await this.findById_R(id);
        if(userResult == null){
            return "This id not exist." as string;
        }

        //Find Process
        try{
            let userRepository = new UserRepository();
            let result:UserInterface     = await userRepository.findById_R(id);
            return result;
        }catch(error){
            if(error.code != null){
                return "Error occurred." as string;
            }
        }
    }
}

/* 
Prisma Erros
- Code:         https://www.prisma.io/docs/orm/reference/error-reference#error-codes    
*/

