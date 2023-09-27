import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
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
    // private farms: Farm[] = [
    //     {
    //         id: "1",
    //         name: "carrot farm"
    //     },
    //     {
    //         id: "2",
    //         name: "tomato farm"
    //     },
    //     {
    //         id: "3",
    //         name: "potato farm"
    //     }
    // ];

    async getAllFarms(): Promise<Farm[]> {
        return await this.farmModel.find({});
    }
    // getAllFarms(): Farm[] {
    //     return this.farms;
    // }

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
    // createFarm(createFarmDto: CreateFarmDto): Farm {
    //     const { name } = createFarmDto;

    //     const farm: Farm = {
    //         id: uuid(),
    //         name
    //     }
    //     this.farms.push(farm);
    //     return farm;
    // }

    async getFarmById(id: string): Promise<Farm> {
        const farm = await this.farmModel.findById(id);
        if (!farm) {
            throw new NotFoundException(`Cannot find #${id} farm!`);
        }
        return farm;
    }
    // getFarmById(id: string): Farm {
    //     const farm = this.farms.find((farm) => farm.id === id);
    //     if (!farm) {
    //         throw new NotFoundException(`Cannot find #${id} farm!`);
    //     }
    //     return farm;
    // }

    async updateFarmById(id: string, createFarmDto: CreateFarmDto): Promise<Farm> {
        const farm = await this.farmModel.findByIdAndUpdate(id, createFarmDto);
        return this.getFarmById(id);
    }
    // updateFarmById(id: string, createFarmDto: CreateFarmDto): Farm {
    //     const { name } = createFarmDto;
    //     const farm = this.getFarmById(id);
    //     farm.name = name;
    //     return farm;

    // }

    async deleteFarm(farmId: string, req): Promise<string> {
        const { username } = req.user;
        await this.userModel.findOneAndUpdate({ username }, { $pull: { farms: farmId } })
        await this.farmModel.findByIdAndDelete(farmId);
        return "delete success";
    }
    // deleteFarm(id: string): void {
    //     const found = this.getFarmById(id);
    //     this.farms = this.farms.filter((farm) => farm.id !== found.id);
    // }
}
