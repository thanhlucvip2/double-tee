import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { AuthController } from "./auth.controller";

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [UserController, AuthController],
	providers: [UserService],
})
export class UserModule {}
