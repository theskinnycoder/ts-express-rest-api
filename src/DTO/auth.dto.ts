import { IUser } from '../interfaces';

export interface RegisterDTO extends IUser {}

export interface LoginDTO extends Partial<RegisterDTO> {}
