import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";
import { MAIL_HOST, MAIL_PASS, MAIL_USER } from "@/configs/app.config";
import { MailService } from "./mail.service";

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: MAIL_HOST,
				secure: false,
				auth: {
					user: MAIL_USER,
					pass: MAIL_PASS,
				},
			},
			defaults: {
				from: `From mail ${MAIL_USER}`,
			},
			template: {
				dir: join(__dirname, "src/templateMail"),
				adapter: new HandlebarsAdapter(),
				options: {
					strict: true,
				},
			},
		}),
	],
	providers: [MailService],
	exports: [MailService],
})
export class MailModule {}
