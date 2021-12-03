import { hash, verify } from 'argon2';
import { Exclude } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
import { BeforeInsert, Column, Entity, Index } from 'typeorm';
import { IUser } from '../interfaces';
import Base from './Base.entity';

enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity('user')
export default class User extends Base implements IUser {
  @Index()
  @Length(6, 20, { message: 'Handle must be 6-20 characters long' })
  @IsNotEmpty({ message: 'Handle must not be empty' })
  @Column({ unique: true })
  handle: string;

  @Index()
  @IsEmail(undefined, { message: 'Must be a valid email address' })
  @IsNotEmpty({ message: 'Email address must not be empty' })
  @Column({ unique: true })
  email: string;

  @Length(8, 255, { message: 'Password must be atleast 8 characters long' })
  @IsNotEmpty({ message: 'Password must not be empty' })
  @Exclude()
  @Column()
  password: string;

  @IsEnum(Roles)
  role: Roles;

  @BeforeInsert()
  async hashPassword(rawPassword: string) {
    this.password = await hash(rawPassword);
  }

  async checkPassword(enteredPassword: string) {
    return verify(this.password, enteredPassword);
  }
}
