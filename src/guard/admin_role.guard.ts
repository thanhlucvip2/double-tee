import { ROLE } from '@/constants/constants_role';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.cookies['jwt'];
    const user = await this.validateToken(token);
    if (user?.role !== ROLE.ADMIN) {
      throw new HttpException('Bạn không có quyền admin', HttpStatus.FORBIDDEN);
    }

    return user.role === ROLE.ADMIN;
  }
  async validateToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });
      return payload;
    } catch (err) {}
  }
}
