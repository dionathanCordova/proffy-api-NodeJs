import { Request, Response } from 'express';

import UpdateAvatarService from '../services/UpdateAvatarService';

export default class UpdateAvatar{
    public async index(request: Request, response: Response) : Promise<Response> {
        const { location } = request.file; 

        const { userid } = request.headers;
        
        const updateAvatarService = new UpdateAvatarService();
        const avatarUpload = await updateAvatarService.execute({location, userid});

        if(avatarUpload) {
            return response.json({status: 'ok', avatarUpload});
        }else{
            return response.json({status: 'error'})
        }
    }
}