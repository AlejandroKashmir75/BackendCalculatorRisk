"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const risk_entity_1 = require("./risk.entity");
let RiskService = class RiskService {
    constructor(riskRepository) {
        this.riskRepository = riskRepository;
    }
    calculateRiskScore(likelihood, severity) {
        const likelihoodScores = {
            [risk_entity_1.Likelihood.IMPOSSIBLE]: 1,
            [risk_entity_1.Likelihood.REMOTE]: 2,
            [risk_entity_1.Likelihood.UNLIKELY]: 3,
            [risk_entity_1.Likelihood.POSSIBLE]: 4,
            [risk_entity_1.Likelihood.UNUSUAL]: 5,
            [risk_entity_1.Likelihood.KNOWN]: 6,
            [risk_entity_1.Likelihood.LIKELY]: 7,
            [risk_entity_1.Likelihood.USUAL]: 8,
            [risk_entity_1.Likelihood.CERTAIN]: 9,
        };
        const severityScores = {
            [risk_entity_1.Severity.INSIGNIFICANT]: 1,
            [risk_entity_1.Severity.MINOR_INCIDENT]: 2,
            [risk_entity_1.Severity.MINOR_INJURY]: 3,
            [risk_entity_1.Severity.HEALTH_DAMAGE]: 4,
            [risk_entity_1.Severity.INJURY]: 5,
            [risk_entity_1.Severity.MULTIPLE_INJURIES]: 6,
            [risk_entity_1.Severity.SERIOUS_INJURY]: 7,
            [risk_entity_1.Severity.FATAL]: 8,
            [risk_entity_1.Severity.MULTIPLE_FATALITIES]: 9,
        };
        return likelihoodScores[likelihood] * severityScores[severity];
    }
    calculateRiskLevel(riskScore) {
        if (riskScore <= 9)
            return risk_entity_1.RiskLevel.VERY_LOW;
        if (riskScore <= 25)
            return risk_entity_1.RiskLevel.LOW;
        if (riskScore <= 49)
            return risk_entity_1.RiskLevel.MEDIUM;
        if (riskScore <= 64)
            return risk_entity_1.RiskLevel.HIGH;
        return risk_entity_1.RiskLevel.VERY_HIGH;
    }
    async create(createRiskDto) {
        const riskScore = this.calculateRiskScore(createRiskDto.likelihood, createRiskDto.severity);
        const riskLevel = this.calculateRiskLevel(riskScore);
        const risk = this.riskRepository.create({
            ...createRiskDto,
            riskScore,
            riskLevel,
        });
        return this.riskRepository.save(risk);
    }
    async findAll() {
        return this.riskRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        return this.riskRepository.findOne({ where: { id } });
    }
    async remove(id) {
        await this.riskRepository.delete(id);
    }
};
exports.RiskService = RiskService;
exports.RiskService = RiskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(risk_entity_1.Risk)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RiskService);
//# sourceMappingURL=risk.service.js.map