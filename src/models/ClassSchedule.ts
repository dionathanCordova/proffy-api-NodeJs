import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
  
import Classes from './Classes';
  
@Entity('class_schedule')
export default class ClassSchedule {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    class_id: string;
  
    @ManyToOne(() => Classes, classEntity => classEntity.class_schedule)
    @JoinColumn({ name: 'class_id' })
    class: Classes;
  
    @Column()
    week_day: number;
  
    @Column()
    from: number;
  
    @Column()
    to: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}