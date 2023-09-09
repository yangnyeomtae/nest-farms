import { Controller, Get, Post, Param, Body, Put, Delete, Render, Redirect, ValidationPipe, UsePipes } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto/createFarm.dto';
import { Farm } from './Schemas/farm.schema';

@Controller('farms')
export class FarmsController {
    constructor(private farmsService: FarmsService) { }

    @Get()
    async getAllFarms() :Promise<Farm[]> {
        return this.farmsService.getAllFarms();
    }
    // @Get()
    // getAllFarms() {
    //     return this.farmsService.getAllFarms();
    // }

    @Post()
    @UsePipes(ValidationPipe)
    async createFarm(@Body() createFarmDto: CreateFarmDto): Promise<Farm> {
        return this.farmsService.createFarm(createFarmDto);
    }
    // @Post()
    // @UsePipes(ValidationPipe)
    // createFarm(@Body() createFarmDto: CreateFarmDto): Farm {
    //     return this.farmsService.createFarm(createFarmDto);
    // }

    @Get('/:id')
    async getFarmById(@Param('id') id: string): Promise<Farm> {
        return this.farmsService.getFarmById(id);
    }
    // @Get('/:id')
    // getFarmById(@Param('id') id: string): Farm {
    //     return this.farmsService.getFarmById(id);
    // }

    @Put('/:id')
    async updateFarmById(
        @Param('id') id: string,
        @Body() createFarmDto: CreateFarmDto): Promise<Farm> {
            return this.farmsService.updateFarmById(id, createFarmDto);
    }
    // @Put('/:id')
    // updateFarmById(
    //     @Param('id') id: string,
    //     @Body() createFarmDto: CreateFarmDto) {
    //     return this.farmsService.updateFarmById(id, createFarmDto);
    // }

    @Delete('/:id')
    async deleteFarm(@Param('id') id: string): Promise<void> {
        this.farmsService.deleteFarm(id);
    }
    // @Delete('/:id')
    // deleteFarm(@Param('id') id: string): void {
    //     this.farmsService.deleteFarm(id);
    // }
}
