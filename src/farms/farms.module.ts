import { Module } from '@nestjs/common';
import { FarmsController } from './farms.controller';
import { FarmsService } from './farms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Farm, FarmSchema } from './Schemas/farm.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Farm.name, schema: FarmSchema }])],
  controllers: [FarmsController],
  providers: [FarmsService]
})
export class FarmsModule {}