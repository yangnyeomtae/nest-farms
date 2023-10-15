import { Controller, Get, Post, Param, Body, Put, Delete, ValidationPipe, UsePipes, UseGuards, Req, Logger } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto/createFarm.dto';
import { Farm } from './Schemas/farm.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('farms')
@UseGuards(JwtAuthGuard)
export class FarmsController {
    constructor(private farmsService: FarmsService) { }
    private logger = new Logger('FarmsController');

    @Get()
    getUsersFarms(@Req() req): Promise<Farm[]> {
        this.logger.verbose(`User ${req.user.username} trying to get all farms`);
        return this.farmsService.getUsersFarms(req);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createFarm(@Body() createFarmDto: CreateFarmDto, @Req() req): Promise<Farm> {
        this.logger.verbose(`User ${req.user.username} trying to create a farm.
        Payload: ${JSON.stringify(createFarmDto)}`);
        return this.farmsService.createFarm(createFarmDto, req);
    }

    @Put('/:id')
    updateFarmById(
        @Param('id') id: string,
        @Body() createFarmDto: CreateFarmDto): Promise<Farm> {
        return this.farmsService.updateFarmById(id, createFarmDto);
    }

    @Delete('/:id')
    deleteFarm(
        @Param('id') farmId: string,
        @Req() req
    ): Promise<string> {
        this.logger.verbose(`User ${req.user.username} trying to delete a farm`);
        return this.farmsService.deleteFarm(farmId, req);
    }
}
