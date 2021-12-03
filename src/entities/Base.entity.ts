import { classToPlain, Exclude } from 'class-transformer';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export default abstract class Base extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn({ type: 'int' })
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  toJSON() {
    return classToPlain(this);
  }
}
