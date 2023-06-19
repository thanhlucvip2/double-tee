import { Controller, Post, Body, UseGuards, Get, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import {
	CreateUserDto,
	ResendCodeDto,
	VeryCodeDto,
} from "./dto/create-user.dto";
import { UserInfoDto } from "./dto/user-info.dto";
import { AuthGuard } from "@/guard/auth.guard";
import { AdminRoleGuard } from "@/guard/admin_role.guard";
import { UserIdDecorator } from "./user.decorator";
import { PaginationDto } from "@/shared/pagination.dto";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post("register")
	async createUser(
		@Body() createUserDto: CreateUserDto,
	): Promise<{ message: string }> {
		return this.userService.register(createUserDto);
	}

	@Get("very-code")
	async veryCode(@Query() data: VeryCodeDto) {
		return this.userService.veryCode(data);
	}
	@Get("resend-code")
	async resendCode(@Query() data: ResendCodeDto) {
		return this.userService.resendCode(data);
	}

	@Get("info")
	@UseGuards(AuthGuard)
	async getUserInfo(@UserIdDecorator() userId: string): Promise<UserInfoDto> {
		return this.userService.getUserInfo(userId);
	}

	@Get("/all-user")
	@UseGuards(AuthGuard, AdminRoleGuard)
	async getAllUser(@Query() pagination: PaginationDto) {
		return this.userService.getAllUser(pagination);
	}
}
