import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { Likelihood, Severity } from '../risk.entity';

export class CreateRiskDto {
  @IsNotEmpty()
  @IsString()
  hazard: string;

  @IsNotEmpty()
  @IsIn(Object.values(Likelihood))
  likelihood: Likelihood;

  @IsNotEmpty()
  @IsIn(Object.values(Severity))
  severity: Severity;
}

