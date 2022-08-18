import { Controller, Header, HttpException, HttpStatus, Post, Req } from '@nestjs/common';

import { Request } from 'express';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) { }

  @Post('')
  @Header('Cache-Control', 'none')
  async login(@Req() req: Request) {
    const { type, payload } = req.body
    if (type === 'password') return await this.auth.loginWithEmailAndPassword(payload.email, payload.password)
    else throw new HttpException('Invalid type', HttpStatus.BAD_REQUEST)
  }

  @Post('signup')
  @Header('Cache-Control', 'none')
  async signup(@Req() req: Request) {
    const { type, payload } = req.body
    if (type) throw new HttpException('Invalid type', HttpStatus.BAD_REQUEST)

    try {
      await this.auth.signup(payload)
      return await this.auth.loginWithEmailAndPassword(payload.email, payload.password)
    } catch (error) {
      console.error(error)
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Post('refresh')
  @Header('Cache-Control', 'none')
  async refresh(@Req() req: Request) {
    const { refresh_token } = req.body
    if (refresh_token?.trim().length === 0) throw new HttpException('Invalid refresh token', HttpStatus.BAD_REQUEST)
    return await this.auth.refresh(refresh_token)
  }

}