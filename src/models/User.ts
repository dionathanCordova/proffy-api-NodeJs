import { uuid } from 'uuidv4';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    avatar: string;

    @Column()
    whatsapp: string;

    @Column()
    bio: string;
    
    @Column()
    email: string;
    
    @Column()
    password: string;

    @Column()
    password_reset_token: string;
    
    @Column('time with time zone')
    password_reset_expires: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;