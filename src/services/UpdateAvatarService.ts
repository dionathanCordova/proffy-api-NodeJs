import db from "../database/sqlite/conecction";
import User from "../models/User";
import { getRepository } from "typeorm";

interface UpdateProps {
    userid: string | string[] | undefined;
    location: string; 
}

export default class UpdateAvatarService {
    public async execute({userid, location}: UpdateProps) : Promise<any> {

        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: { id: userid}
        });

        if(!user) {
            throw new Error('User does not found');
        }

        user.avatar = location;
        await userRepository.save(user);

        return user;
    }
}