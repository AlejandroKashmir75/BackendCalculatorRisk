import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskController } from './risk.controller';
import { RiskService } from './risk.service';
import { Risk } from './risk.entity';
import { MetricsModule } from '../metrics/metrics.module';
@Module({
  imports: [TypeOrmModule.forFeature([Risk]),MetricsModule],
  controllers: [RiskController],
  providers: [RiskService],
  exports: [RiskService],
})
export class RiskModule {}

