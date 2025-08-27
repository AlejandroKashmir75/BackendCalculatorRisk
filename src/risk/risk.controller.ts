import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, HttpCode } from '@nestjs/common';
import { RiskService } from './risk.service';
import { CreateRiskDto } from './dto/create-risk.dto';
import { Risk } from './risk.entity';

@Controller('risks')
export class RiskController {
  constructor(private readonly riskService: RiskService) {}

  @Post()
  async create(@Body() createRiskDto: CreateRiskDto): Promise<Risk> {
    return this.riskService.create(createRiskDto);
  }

  @Get()
  async findAll(): Promise<Risk[]> {
    return this.riskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Risk> {
    return this.riskService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.riskService.remove(id);
  }
}


