import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { join } from 'path';

import { OrganizationsModule } from './organizations/organizations.module';
import { OrganizationUnitsModule } from './organization-units/organization-units.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'ministry'),
      exclude: ['/api*'],
    }),
    MongooseModule.forRoot(process.env.MINISTRY_URI),
    OrganizationsModule,
    OrganizationUnitsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
