import { Module } from '@nestjs/common';
import { AuthModule } from '@central/auth';
import { UsersModule } from '@central/users';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
