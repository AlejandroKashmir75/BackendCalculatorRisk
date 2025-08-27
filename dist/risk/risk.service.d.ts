import { Repository } from 'typeorm';
import { Risk } from './risk.entity';
import { CreateRiskDto } from './dto/create-risk.dto';
export declare class RiskService {
    private riskRepository;
    constructor(riskRepository: Repository<Risk>);
    private calculateRiskScore;
    private calculateRiskLevel;
    create(createRiskDto: CreateRiskDto): Promise<Risk>;
    findAll(): Promise<Risk[]>;
    findOne(id: number): Promise<Risk>;
    remove(id: number): Promise<void>;
}
