import { RiskService } from './risk.service';
import { CreateRiskDto } from './dto/create-risk.dto';
import { Risk } from './risk.entity';
export declare class RiskController {
    private readonly riskService;
    constructor(riskService: RiskService);
    create(createRiskDto: CreateRiskDto): Promise<Risk>;
    findAll(): Promise<Risk[]>;
    findOne(id: number): Promise<Risk>;
    remove(id: number): Promise<void>;
}
