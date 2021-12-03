import { Body, Delete, Get, HttpCode, JsonController, Param, Post, Put } from 'routing-controllers';
import { CreatePostDTO, UpdatePostDTO } from '../DTO';

@JsonController('/posts')
export default class PostsControllers {
  @Get()
  async index() {
    return { posts: [] };
  }

  @Get('/:id')
  async details(@Param('id') id: string) {
    return { postID: id };
  }

  @Post()
  @HttpCode(201)
  async post(@Body() body: CreatePostDTO) {
    const { title, content, excerpt } = body;
    return { newPost: { title, content, excerpt } };
  }

  @Put()
  async update(@Body() body: UpdatePostDTO) {
    const { title, content, excerpt } = body;
    return { updatedPost: { title, content, excerpt } };
  }

  @Delete()
  async delete(@Param('id') id: string) {
    return { deletedpostID: id };
  }
}
