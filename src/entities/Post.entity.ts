import { Column, Entity, Index } from 'typeorm';
import { IPost } from '../interfaces';
import Base from './Base.entity';

@Entity('post')
export default class Post extends Base implements IPost {
  @Index()
  @Column({ unique: true })
  title: string;

  @Column()
  excerpt: string;

  @Column()
  content: string;
}
