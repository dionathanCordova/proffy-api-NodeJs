import { Request, Response } from 'express';
import db from '../database/sqlite/conecction';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface SheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController{

    async index(request: Request, response: Response) {
        const {week_day, subject, time}  = request.query;

        if(!week_day || !subject || !time) {
            return response.status(400).json({'error': 'missing filters to search classes'});
        }

        const timeInMinutes = convertHourToMinutes(time as string);

        const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject as string)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return response.json(classes);
    }

    async create(request : Request, response: Response) {
        const { id, name, avatar, whatsapp, bio, subject, cost, schedule} = request.body;
    
        const trx = await db.transaction();
        
        try {
            const insertedUsersId = await trx('users')
                .where('id', '=', id)
                .update({
                    name,
                    avatar,
                    whatsapp,
                    bio
                });

            const user_id = insertedUsersId;


            
            const insertedIdClasses = await trx('classes').insert({
                subject,
                cost,
                user_id
            });

            const class_id = insertedIdClasses[0];
        
            const classSchedule = schedule.map((sched: SheduleItem) => {
                return { 
                    class_id,
                    week_day: sched.week_day,
                    from: convertHourToMinutes(sched.from),
                    to: convertHourToMinutes(sched.to)
                }
            })

            await trx('class_schedule').insert(classSchedule);
        
            await trx.commit();
        
         
            return response.status(201).json('user_id');
        } catch (error) {
            await trx.rollback();
            return response.status(400).json({error: 'unexpected error white creating the class, make a call to admistrator'})
        }
    }
}