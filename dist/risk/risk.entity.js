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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Risk = exports.RiskLevel = exports.Severity = exports.Likelihood = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
var Likelihood;
(function (Likelihood) {
    Likelihood["IMPOSSIBLE"] = "Impossible";
    Likelihood["REMOTE"] = "Remote";
    Likelihood["UNLIKELY"] = "Unlikely";
    Likelihood["POSSIBLE"] = "Possible";
    Likelihood["UNUSUAL"] = "Unusual";
    Likelihood["KNOWN"] = "Known";
    Likelihood["LIKELY"] = "Likely";
    Likelihood["USUAL"] = "Usual";
    Likelihood["CERTAIN"] = "Certain";
})(Likelihood || (exports.Likelihood = Likelihood = {}));
var Severity;
(function (Severity) {
    Severity["INSIGNIFICANT"] = "Insignificant";
    Severity["MINOR_INCIDENT"] = "Minor incident";
    Severity["MINOR_INJURY"] = "Minor injury";
    Severity["HEALTH_DAMAGE"] = "Health damage";
    Severity["INJURY"] = "Injury";
    Severity["MULTIPLE_INJURIES"] = "Multiple injuries";
    Severity["SERIOUS_INJURY"] = "Serious injury";
    Severity["FATAL"] = "Fatal";
    Severity["MULTIPLE_FATALITIES"] = "Multiple fatalities";
})(Severity || (exports.Severity = Severity = {}));
var RiskLevel;
(function (RiskLevel) {
    RiskLevel["VERY_LOW"] = "Very Low";
    RiskLevel["LOW"] = "Low";
    RiskLevel["MEDIUM"] = "Medium";
    RiskLevel["HIGH"] = "High";
    RiskLevel["VERY_HIGH"] = "Very High";
})(RiskLevel || (exports.RiskLevel = RiskLevel = {}));
let Risk = class Risk {
};
exports.Risk = Risk;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Risk.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Risk.prototype, "hazard", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Likelihood,
        default: Likelihood.POSSIBLE
    }),
    (0, class_validator_1.IsIn)(Object.values(Likelihood)),
    __metadata("design:type", String)
], Risk.prototype, "likelihood", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Severity,
        default: Severity.INJURY
    }),
    (0, class_validator_1.IsIn)(Object.values(Severity)),
    __metadata("design:type", String)
], Risk.prototype, "severity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(81),
    __metadata("design:type", Number)
], Risk.prototype, "riskScore", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RiskLevel,
        default: RiskLevel.MEDIUM
    }),
    (0, class_validator_1.IsIn)(Object.values(RiskLevel)),
    __metadata("design:type", String)
], Risk.prototype, "riskLevel", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Risk.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Risk.prototype, "updatedAt", void 0);
exports.Risk = Risk = __decorate([
    (0, typeorm_1.Entity)('risks')
], Risk);
//# sourceMappingURL=risk.entity.js.map