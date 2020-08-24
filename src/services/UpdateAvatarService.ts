import db from "../database/conecction";

interface UpdateProps {
    userId: string;
    location: string; 
}

export default class UpdateAvatarService {
    public async execute({userId, location}: UpdateProps) : Promise<any> {
        const userid = userId.replace(/"/g, '');

        const userID = await db('users')
        .where('id', userid)
        .update({
            avatar: location
        });

        const user = await db('users').where('id', userID);

        return { user };
    }
}