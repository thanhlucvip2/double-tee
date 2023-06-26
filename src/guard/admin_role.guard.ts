import { ROLE } from "@/utils/constants/constants_role";
import {
	Injectable,
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
@Injectable()
export class AdminRoleGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request = context.switchToHttp().getRequest();

		const user = request["user"];
		if (user?.role !== ROLE.ADMIN) {
			throw new HttpException("Bạn không có quyền admin", HttpStatus.FORBIDDEN);
		}

		return user.role === ROLE.ADMIN;
	}
}
