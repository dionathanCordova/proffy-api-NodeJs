import { Request, Response } from 'express';
import db from '../database/sqlite/conecction';
import { getRepository } from 'typeorm';
import ConnectionRepository from '../models/Connection';

export default class ConnectionsController{
    async index(request: Request, response: Response) {
        try {
            const connectionRepository = getRepository(ConnectionRepository);

            const [, total ] = await connectionRepository.findAndCount();

            return response.status(200).json({total});
        } catch (error) {
            return response.status(400).json({error: 'some error while list the connection'})
        }
        
    }

    async create(request: Request, response: Response) {
        try {
            const { user_id } = request.body;

            const connectionRepository = getRepository(ConnectionRepository);
            
            const connection = connectionRepository.create({
                user_id
            });

            await connectionRepository.save(connection);

            return response.status(201).send();
        } catch (error) {
            return response.status(400).json({error: 'some error while create the connection'})
        }
    }
}