"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const risk_module_1 = require("./risk/risk.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: async () => {
                    const host = process.env.DB_HOST || 'localhost';
                    const port = parseInt(process.env.DB_PORT || '3306');
                    const username = process.env.DB_USERNAME || 'root';
                    const password = process.env.DB_PASSWORD || '3210';
                    const database = process.env.DB_DATABASE || 'security_risk_calculator';
                    return {
                        type: 'mariadb',
                        host,
                        port,
                        username,
                        password,
                        database,
                        entities: [__dirname + '/**/*.entity{.ts,.js}'],
                        synchronize: process.env.NODE_ENV === 'development',
                        logging: process.env.NODE_ENV === 'development',
                    };
                },
            }),
            risk_module_1.RiskModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map