import { Response } from 'express';
import { Body, HttpCode, JsonController, Post, Res } from 'routing-controllers';
import { LoginDTO, RegisterDTO } from '../DTO';

@JsonController('/auth')
export default class AuthControllers {
  @HttpCode(201)
  @Post('/register')
  async register(@Body({ required: true }) body: RegisterDTO) {
    const { handle, email, password } = body;
    return { newUser: { handle, email, password } };
  }

  @Post('/login')
  async login(@Body({ required: true }) body: LoginDTO, @Res() res: Response) {
    const { email, password } = body;
    res.locals.user = { email, password };
    return { loggedInUser: res.locals.user };
  }

  @Post('/logout')
  async logout(@Res() res: Response) {
    return { loggedOutUser: res.locals.user };
  }
}
