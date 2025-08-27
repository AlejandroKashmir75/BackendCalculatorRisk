import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Risk, Likelihood, Severity, RiskLevel } from './risk.entity';
import { CreateRiskDto } from './dto/create-risk.dto';

@Injectable()
export class RiskService {
  constructor(
    @InjectRepository(Risk)
    private riskRepository: Repository<Risk>,
  ) {}

  private calculateRiskScore(likelihood: Likelihood, severity: Severity): number {
    const likelihoodScores = {
      [Likelihood.IMPOSSIBLE]: 1,
      [Likelihood.REMOTE]: 2,
      [Likelihood.UNLIKELY]: 3,
      [Likelihood.POSSIBLE]: 4,
      [Likelihood.UNUSUAL]: 5,
      [Likelihood.KNOWN]: 6,
      [Likelihood.LIKELY]: 7,
      [Likelihood.USUAL]: 8,
      [Likelihood.CERTAIN]: 9,
    };

    const severityScores = {
      [Severity.INSIGNIFICANT]: 1,
      [Severity.MINOR_INCIDENT]: 2,
      [Severity.MINOR_INJURY]: 3,
      [Severity.HEALTH_DAMAGE]: 4,
      [Severity.INJURY]: 5,
      [Severity.MULTIPLE_INJURIES]: 6,
      [Severity.SERIOUS_INJURY]: 7,
      [Severity.FATAL]: 8,
      [Severity.MULTIPLE_FATALITIES]: 9,
    };

    return likelihoodScores[likelihood] * severityScores[severity];
  }

  private calculateRiskLevel(riskScore: number): RiskLevel {
    if (riskScore <= 9) return RiskLevel.VERY_LOW;
    if (riskScore <= 25) return RiskLevel.LOW;
    if (riskScore <= 49) return RiskLevel.MEDIUM;
    if (riskScore <= 64) return RiskLevel.HIGH;
    return RiskLevel.VERY_HIGH;
  }

  async create(createRiskDto: CreateRiskDto): Promise<Risk> {
    const riskScore = this.calculateRiskScore(createRiskDto.likelihood, createRiskDto.severity);
    const riskLevel = this.calculateRiskLevel(riskScore);

    const risk = this.riskRepository.create({
      ...createRiskDto,
      riskScore,
      riskLevel,
    });

    return this.riskRepository.save(risk);
  }

  async findAll(): Promise<Risk[]> {
    return this.riskRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Risk> {
    return this.riskRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.riskRepository.delete(id);
  }
}
