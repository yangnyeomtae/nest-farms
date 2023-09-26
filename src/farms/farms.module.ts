import { Module } from '@nestjs/common';
import { FarmsController } from './farms.controller';
import { FarmsService } from './farms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Farm, FarmSchema } from './Schemas/farm.schema';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/auth/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Farm.name, schema: FarmSchema }, 
      { name: User.name, schema: UserSchema }
    ]),
    AuthModule
  ],
  controllers: [FarmsController],
  providers: [FarmsService]
})
export class FarmsModule { }