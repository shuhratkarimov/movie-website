import { Module } from '@nestjs/common';

import { AdminModule } from './admin/admin.module';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AdminModule,
    MoviesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.db_url as string),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
