import { Module } from '@nestjs/common';
import { DatabaseModule, MailModule } from '@/modules';
import { JwtModule } from '@nestjs/jwt';
import { SECRET } from '@/configs/app.config';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from '@/systems/http-error.filter';

@Module({
  imports: [
    DatabaseModule,
    MailModule,
    JwtModule.register({
      global: true,
      secret: SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
