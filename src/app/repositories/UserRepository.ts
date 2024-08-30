import { UserInterface } from "../interfaces/UserInterface";        
import prismaClient      from "../../../prisma/prismaObject";

export class UserRepository{
    //Methods: CUD
    async create_R(user:UserInterface):Promise<UserInterface>{
        const userGet:UserInterface = await prismaClient.userModel.create({
            data:   { name: user.name, email: user.email, age: user.age, 
                      image_name_ext: user.image_name_ext, pass_encrypted: user.pass_encrypted },

            select: { id:true, name:true, email:true }
        })
        return userGet;
    }

    async update_R(id:number, user:UserInterface):Promise<UserInterface>{
        const userGet = await prismaClient.userModel.update({
            where:  { id: id },
            data:   { name: user.name, email: user.email, age: user.age, 
                      image_name_ext: user.image_name_ext, pass_encrypted: user.pass_encrypted },

            select: { id:true, name:true, email:true }
        })
        return userGet;
    }

    async delete_R(id:number):Promise<UserInterface>{
        const userGet = await prismaClient.userModel.delete({
            where:  { id: id },
            select: { id:true, name:true, email:true }
        })
        return userGet;
    }

    //Methods: Query
    async findAll_R():Promise<any>{
        const users = await prismaClient.userModel.findMany({
            select: { id:true, name:true, email:true }
        })
        return users;
    }
    
    async findById_R(id:number):Promise<UserInterface>{
        const userGet = await prismaClient.userModel.findFirst({
            where:  { id: id },
            select: { id:true, name:true, email:true }
        })
        return userGet;
    }
    
    async findByEmail_R(email:string):Promise<UserInterface>{
        const userGet = await prismaClient.userModel.findFirst({
            where:  { email: email },
            select: { id:true, name:true, email:true, pass_encrypted:true }
        })
        return userGet;
    }
}

