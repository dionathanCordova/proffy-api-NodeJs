import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../models/User';

interface ICreateData {
    name: string;
    surname: string;
    email: string;
    password: string;
    confirm_password: string;
}

export default class CreateUserService {
    public async execute({name, surname, email, password, confirm_password}: ICreateData ): Promise<any> {
        const userRepository = getRepository(User);

        if(!name || !email || !password || !confirm_password) {
            throw new Error("All fiels are required");
        }

        if(password !== confirm_password) {
            throw new Error("Password does not match");
        }   

        const checkUserExists = await userRepository.findOne({
            where: { email}
        });

        if(checkUserExists) {
            throw new Error("Email already in use");
        }

        const user = userRepository.create({
            name: `${name} ${surname}`,
            email,
            password:  await hash(password, 8)
        })

        await userRepository.save(user);

        if(user) {
            return {status: 'ok', statusCode: "201"}
        }else{
            return {status: 'error', statusCode: "400"}
        }
    }
}