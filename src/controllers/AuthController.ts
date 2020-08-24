import { Request, Response } from 'express';
import AuthenticateService from '../services/AuthenticateService';

export default class AuthenticateController{
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const { email, password } = request.body;

            const authService = new AuthenticateService();
            const { userData, token } = await authService.execute({email, password})

            const user = {
                id : userData.id,
                name: userData.name,
                avatar: userData.avatar,
                whatsapp: userData.whatsapp,
                bio: userData.bio,
                email: userData.email,
                password: userData.password,
            };

            return response.json({user, token});
        } catch (error) {
            return response.json({error: error.message})
        }
    }
}