import { UserService } from "./user.service";
import { Controller, Post, Body } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
@Controller("auth")
export class AuthController {
	constructor(private readonly userService: UserService) {}

	@Post("login")
	async loginUser(@Body() loginUser: LoginUserDto): Promise<{ token: string }> {
		const token = await this.userService.login(loginUser);
		return {
			token: token,
		};
	}
}
