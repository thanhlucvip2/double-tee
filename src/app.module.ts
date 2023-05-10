import { Module } from '@nestjs/common';
import { DatabaseModule, MailModule } from '@/modules';
import { JwtModule } from '@nestjs/jwt';
import { SECRET } from '@/configs/app.config';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from '@/systems/http-error.filter';
import { UserModule } from '@/user/user.module';
import { ProductsTypeModule } from '@/apis/products-type/products-type.module';
import { ReceiveModule } from '@/apis/receive/receive.module';
@Module({
  imports: [
    DatabaseModule,
    MailModule,
    JwtModule.register({
      global: true,
      secret: SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
    ProductsTypeModule,
    ReceiveModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
