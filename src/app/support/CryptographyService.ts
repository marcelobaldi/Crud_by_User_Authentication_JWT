import bcrypt, { compare } from 'bcryptjs';		

export class CryptographyService{
    public static async generate(passOriginal:string):Promise<string>{
        let passEncrypted = await bcrypt.hash(passOriginal, 8);		
        return passEncrypted;
    }

    public static async verify(passOriginal:string, passEncrypted:string):Promise<Boolean>{
        let result:boolean = await compare(passOriginal, passEncrypted); 
        return result;
    }
}

