import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFarmDto } from './dto/createFarm.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Farm } from './Schemas/farm.schema';
import { User } from 'src/auth/schemas/user.schema';


@Injectable()
export class FarmsService {
    constructor(
        @InjectModel(Farm.name) private farmModel: Model<Farm>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async getAllFarms(): Promise<Farm[]> {
        return await this.farmModel.find({});
    }

    async getUsersFarms(req): Promise<Farm[]> {
        const { username } = req.user;
        const user = await this.userModel.findOne({ username }).populate('farms');
        const farms = user.farms;
        return farms;
    }

    async createFarm(createFarmDto: CreateFarmDto, req): Promise<Farm> {
        const { username } = req.user;
        const user = await this.userModel.findOne({ username });
        const farm = new this.farmModel(createFarmDto);
        user.farms.push(farm);
        await farm.save();
        await user.save();
        return farm;
    }

    async getFarmById(id: string): Promise<Farm> {
        const farm = await this.farmModel.findById(id);
        if (!farm) {
            throw new NotFoundException(`Cannot find #${id} farm!`);
        }
        return farm;
    }

    async updateFarmById(id: string, createFarmDto: CreateFarmDto): Promise<Farm> {
        const farm = await this.farmModel.findByIdAndUpdate(id, createFarmDto);
        return this.getFarmById(id);
    }

    async deleteFarm(farmId: string, req): Promise<string> {
        const { username } = req.user;
        await this.userModel.findOneAndUpdate({ username }, { $pull: { farms: farmId } })
        await this.farmModel.findByIdAndDelete(farmId);
        return "delete success";
    }
}
