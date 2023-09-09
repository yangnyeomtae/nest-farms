import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('login')
  root() {
    return { message: 'This is login page' };
  }
}