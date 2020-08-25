import { Request, Response } from 'express';
import db from '../database/sqlite/conecction';

export default class ConnectionsController{
    async index(request: Request, response: Response) {
        try {
            const totalConnections = await db('connections').count('* as total');

            const { total } = totalConnections[0];

            return response.status(200).json({total});
        } catch (error) {
            return response.status(400).json({error: 'some error while list the connection'})
        }
        
    }

    async create(request: Request, response: Response) {
        try {
            const { user_id } = request.body;
    
            await db('connections').insert({
                user_id
            })
    
            return response.status(201).send();
        } catch (error) {
            return response.status(400).json({error: 'some error while create the connection'})
        }
    }
}