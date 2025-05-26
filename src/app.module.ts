import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [AdminModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
