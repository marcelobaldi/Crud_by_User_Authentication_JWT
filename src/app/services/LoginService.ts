import { UserRepository      } from "../repositories/UserRepository";
import { UserInterface       } from "../interfaces/UserInterface";
import { CryptographyService } from "../support/CryptographyService";

export class LoginService extends UserRepository{
    
    async login_S(user:UserInterface):Promise<Boolean | UserInterface>{
        //Check Email
        var userResult = await this.findByEmail_R(user.email);
        if (userResult == null){
            return false;
        }
    
        //Check Password
        let passOriginal:string  = user.pass_original;
        let passEncrypted:string = userResult.pass_encrypted;
        let passResult:Boolean   = await CryptographyService.verify(passOriginal, passEncrypted);

        //Login Process
        if(!passResult) {
            return false;
        }else{
            return userResult;
        }   
    }
    
}

