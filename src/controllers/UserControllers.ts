import { Request, Response } from 'express';
import CreateUserservice from '../services/CreateUserService';

export default class UserController {
    public async create(request: Request, response : Response) : Promise<Response> {
        try {
            const { name, surname, email, password, confirm_password } = request.body;
    
            const createUserservice = new CreateUserservice();
            const user = await createUserservice.execute({name, surname, email, password, confirm_password});
    
            return response.json(user)
        } catch (error) {
            return response.status(400).json({error: error.message})
        }
    }
}