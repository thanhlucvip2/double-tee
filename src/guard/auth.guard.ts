import { HttpException, HttpStatus } from '@nestjs/common';
//TODO : kiểm tra xem người dùng đã đăng nhập chưa để cho phép requests hay không
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    const token = request.cookies['jwt'];
    // check xem trong header request có authorization chưa
    if (!token) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    // check token
    // gắn user vào cho requests
    request.userId = await this.validateToken(token, response);

    return true;
  }
  async validateToken(token: string, response: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });

      return payload.id;
    } catch (err) {
      response.clearCookie('jwt');
      response.clearCookie('isLogin');
      throw new HttpException('Token hết hạn', HttpStatus.UNAUTHORIZED);
    }
  }
}
