import {
  Controller, Get, Post, Request, UseGuards
} from '@nestjs/common'
import { AppService } from './app.service'
import { LocalAuthGuard } from './auth/local-auth.guard'
import { AuthService } from './auth/auth.service'
import { Public } from './common/public.decorator'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  // eslint-disable-next-line class-methods-use-this
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @Public()
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
}
