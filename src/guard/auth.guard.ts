import { HttpException, HttpStatus } from '@nestjs/common';
//TODO : kiểm tra xem người dùng đã đăng nhập chưa để cho phép requests hay không
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      throw new HttpException('Invalid Authorization', HttpStatus.BAD_REQUEST);
    }

    request.user = await this.validateToken(request.headers.authorization);

    return true;
  }
  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      // format Token : Bearer ...token
      // báo token không hợp lệ
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
    const token = auth.split(' ')[1];
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });

      return payload;
    } catch (err) {
      throw new HttpException('Token hết hạn', HttpStatus.UNAUTHORIZED);
    }
  }
}
