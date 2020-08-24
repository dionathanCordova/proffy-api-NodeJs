import db from "../database/conecction"
import { hash } from 'bcryptjs';
import { uuid } from 'uuidv4';

interface ICreateData {
    name: string;
    surname: string;
    email: string;
    password: string;
    confirm_password: string;
}

export default class CreateUserService {
    public async execute({name, surname, email, password, confirm_password}: ICreateData ): Promise<any> {

        if(!name || !email || !password || !confirm_password) {
            throw new Error("All fiels are required");
        }

        if(password !== confirm_password) {
            throw new Error("Password does not match");
        }   

        const checkEmailExists = await db('users')
            .where('users.email', '=', email)
            .first();

        if(checkEmailExists) {
            throw new Error("Email already in use");
        }

        const hashedPassord = await hash(password, 8)

        const fullName = `${name} ${surname}`; 
        const createUser = await db('users').insert({
            name: fullName,
            email,
            password : hashedPassord
        });

        if(createUser) {
            return {status: 'ok', statusCode: "201", fullName}
        }else{
            return {status: 'error', statusCode: "400"}
        }
    }
}