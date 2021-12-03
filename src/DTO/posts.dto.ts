import { IPost } from '../interfaces';

export interface CreatePostDTO extends IPost {}
export interface UpdatePostDTO extends Partial<CreatePostDTO> {}
