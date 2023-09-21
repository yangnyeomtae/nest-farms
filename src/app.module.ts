import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FarmsModule } from './farms/farms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [FarmsModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest-farm'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
