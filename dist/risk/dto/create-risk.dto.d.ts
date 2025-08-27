import { Likelihood, Severity } from '../risk.entity';
export declare class CreateRiskDto {
    hazard: string;
    likelihood: Likelihood;
    severity: Severity;
}
