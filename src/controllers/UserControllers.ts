import { Request, Response } from 'express';
import CreateUserservice from '../services/CreateUserService';
import { getRepository } from 'typeorm';
import User from '../models/User';
import ClassSchedule from '../models/ClassSchedule';

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

    public async findDataById(request: Request, response: Response) : Promise<Response> {
        const { user_id } = request.body;

        const userRepository = getRepository(User);
        const scheduleRepository = getRepository(ClassSchedule);

        const user = await userRepository.findOne(
            {id: user_id},
            {
                relations: [
                    'classes',
                ],
            }
        );

        if(user) {
            if(user.classes.length > 0) {
                const schedule = await scheduleRepository.find({class_id:  user.classes[0].id})
                const userData = {user, schedule}
                return response.json(userData);
            }else{
                return response.json({user});
            }
        }
       
        return response.status(400).json({error: 'Nothing found'});

    }
}