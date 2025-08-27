import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskController } from './risk.controller';
import { RiskService } from './risk.service';
import { Risk } from './risk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Risk])],
  controllers: [RiskController],
  providers: [RiskService],
  exports: [RiskService],
})
export class RiskModule {}

