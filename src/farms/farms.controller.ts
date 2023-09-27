import { Controller, Get, Post, Param, Body, Put, Delete, Render, Redirect, ValidationPipe, UsePipes, UseGuards, Req } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto/createFarm.dto';
import { Farm } from './Schemas/farm.schema';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('farms')
@UseGuards(JwtAuthGuard)
export class FarmsController {
    constructor(private farmsService: FarmsService) { }

    // @Get()
    // getAllFarms(): Promise<Farm[]> {
    //     return this.farmsService.getAllFarms();
    // }
    // @Get()
    // getAllFarms() {
    //     return this.farmsService.getAllFarms();
    // }

    @Get()
    getUsersFarms(@Req() req): Promise<Farm[]> {
        return this.farmsService.getUsersFarms(req);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createFarm(@Body() createFarmDto: CreateFarmDto, @Req() req): Promise<Farm> {
        return this.farmsService.createFarm(createFarmDto, req);
    }
    // @Post()
    // @UsePipes(ValidationPipe)
    // createFarm(@Body() createFarmDto: CreateFarmDto): Farm {
    //     return this.farmsService.createFarm(createFarmDto);
    // }

    @Get('/:id')
    getFarmById(@Param('id') id: string): Promise<Farm> {
        return this.farmsService.getFarmById(id);
    }
    // @Get('/:id')
    // getFarmById(@Param('id') id: string): Farm {
    //     return this.farmsService.getFarmById(id);
    // }

    @Put('/:id')
    updateFarmById(
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
    deleteFarm(
        @Param('id') farmId: string,
        @Req() req
        ): Promise<string> {
        return this.farmsService.deleteFarm(farmId, req);
    }
    // @Delete('/:id')
    // deleteFarm(@Param('id') id: string): void {
    //     this.farmsService.deleteFarm(id);
    // }
}
