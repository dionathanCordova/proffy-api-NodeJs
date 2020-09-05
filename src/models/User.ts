import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    OneToMany,
  } from 'typeorm';
  import Classes from './Classes';
  
  @Entity('users')
  export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    email: string;
  
    @Column()
    password: string;
  
    @Column()
    whatsapp: string;
  
    @Column()
    bio: string;
  
    @Column()
    avatar: string;
  
    @OneToMany(() => Classes, classEntity => classEntity.user)
    classes: Classes[];
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }