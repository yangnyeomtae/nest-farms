import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { CreateFarmDto } from './dto/createFarm.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Farm } from './Schemas/farm.schema';


@Injectable()
export class FarmsService {
    constructor(@InjectModel(Farm.name) private farmModel: Model<Farm>) { }
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

    async createFarm(createFarmDto: CreateFarmDto): Promise<Farm> {
        const farm = new this.farmModel(createFarmDto);
        await farm.save();
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
        if(!farm) {
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

    async deleteFarm(id: string): Promise<void> {
        const farm = await this.farmModel.findByIdAndDelete(id);
        console.log('result', farm);
    }
    // deleteFarm(id: string): void {
    //     const found = this.getFarmById(id);
    //     this.farms = this.farms.filter((farm) => farm.id !== found.id);
    // }
}
