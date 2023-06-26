import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PORT } from "@/configs/app.config";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as basicAuth from "express-basic-auth";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ["error", "warn", "log"],
	});
	// Basic authentication api docs
	const apiPath = `api/swagger`;
	app.use(
		[apiPath],
		basicAuth({
			challenge: true,
			users: {
				thanhlucvip: "300420",
			},
		}),
	);

	// Setup document information api docs
	const config = new DocumentBuilder()
		.setTitle("Hachee Studio")
		.setDescription("Hachee Studio project")
		.setVersion("1.0")
		.addBearerAuth({ type: "http", scheme: "bearer", in: "header" }, "token")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(apiPath, app, document, {
		swaggerOptions: { persistAuthorization: true },
	});

	app.enableCors();
	app.setGlobalPrefix("api");
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(PORT);
}
bootstrap();
