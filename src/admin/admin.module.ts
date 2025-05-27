import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './admin.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[MongooseModule.forFeature([{name:Admin.name,schema:AdminSchema}]
  )],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
