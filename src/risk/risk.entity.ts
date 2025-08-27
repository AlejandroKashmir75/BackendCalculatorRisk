import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsIn, IsNumber, Min, Max } from 'class-validator';

export enum Likelihood {
  IMPOSSIBLE = 'Impossible',
  REMOTE = 'Remote',
  UNLIKELY = 'Unlikely',
  POSSIBLE = 'Possible',
  UNUSUAL = 'Unusual',
  KNOWN = 'Known',
  LIKELY = 'Likely',
  USUAL = 'Usual',
  CERTAIN = 'Certain'
}

export enum Severity {
  INSIGNIFICANT = 'Insignificant',
  MINOR_INCIDENT = 'Minor incident',
  MINOR_INJURY = 'Minor injury',
  HEALTH_DAMAGE = 'Health damage',
  INJURY = 'Injury',
  MULTIPLE_INJURIES = 'Multiple injuries',
  SERIOUS_INJURY = 'Serious injury',
  FATAL = 'Fatal',
  MULTIPLE_FATALITIES = 'Multiple fatalities'
}

export enum RiskLevel {
  VERY_LOW = 'Very Low',
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  VERY_HIGH = 'Very High'
}

@Entity('risks')
export class Risk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  @IsNotEmpty()
  @IsString()
  hazard: string;

  @Column({
    type: 'enum',
    enum: Likelihood,
    default: Likelihood.POSSIBLE
  })
  @IsIn(Object.values(Likelihood))
  likelihood: Likelihood;

  @Column({
    type: 'enum',
    enum: Severity,
    default: Severity.INJURY
  })
  @IsIn(Object.values(Severity))
  severity: Severity;

  @Column({ type: 'int' })
  @IsNumber()
  @Min(1)
  @Max(81)
  riskScore: number;

  @Column({
    type: 'enum',
    enum: RiskLevel,
    default: RiskLevel.MEDIUM
  })
  @IsIn(Object.values(RiskLevel))
  riskLevel: RiskLevel;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
