import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';


import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'ministry'),
      exclude: ['/api*'],
    }),
    MongooseModule.forRoot(process.env.MINISTRY_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
