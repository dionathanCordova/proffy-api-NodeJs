import { Request, Response } from 'express';
import convertHourToMinutes from '../utils/convertHourToMinutes';
import { getRepository } from 'typeorm';

import ClassRepository from '../models/Classes';
import User from '../models/User';
import ClassSchedule from '../models/ClassSchedule';

interface SheduleItem {
    week_day: number;
    from: number;
    to: number;
}

interface IScheduleItem {
    week_day: number;
    from: number;
    to: number;
}

export default class ClassesController {

    async index(request: Request, response: Response) {
        const classRepository = getRepository(ClassRepository);
        const { week_day, subject, time } = request.query;

        if (!week_day || !subject || !time) {
            return response.status(400).json({ 'error': 'missing filters to search classes' });
        }

        const timeInMinutes = convertHourToMinutes(time as string);

        const classes = await classRepository.find({
            join: {
                alias: 'classes',
                innerJoin: { class_schedule: 'classes.class_schedule' },
            },
            where: (qb: any) => {
                qb.where('classes.subject ILIKE :subject', { subject })
                    .andWhere('class_schedule.week_day = :week_day', { week_day })
                    .andWhere('class_schedule.from <= :timeInMinutes', { timeInMinutes })
                    .andWhere('class_schedule.to > :timeInMinutes', { timeInMinutes })
            },
        })

        return response.json(classes);
    }

    async create(request: Request, response: Response) {
        const { id, name, whatsapp, bio, subject, cost, schedule } = request.body;

        const classesRepository = getRepository(ClassRepository);
        const userRepository = getRepository(User);

        const classSchedules = schedule.map((scheduleItem: IScheduleItem) => {
            return { 
                week_day: scheduleItem.week_day,
                from: scheduleItem.from,
                to: scheduleItem.to
            }
        });

        const user = await userRepository.findOne({
            id
        });

        if(!user) {
            throw new Error('User does no found');
        }

        user.bio = bio;
        user.name = name;
        user.whatsapp = whatsapp
        await userRepository.save(user);

        // TERMINAR A CONSULTA de checagem de para insert ou update
        const findClass = classesRepository.createQueryBuilder("user")
        .where(`user.id = ${user.id}`)
        .andWhere('class')

        const newClass = classesRepository.create({
            user_id: id,
            subject,
            cost,
            class_schedule: classSchedules,
        });

        await classesRepository.save(newClass);

        return response.status(201).json(newClass);
    }
}