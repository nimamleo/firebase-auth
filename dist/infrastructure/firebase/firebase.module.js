"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseModule = exports.FIREBASE_PROVIDER = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const firebaseAdmin = require("firebase-admin");
const firebase_config_1 = require("./config/firebase.config");
const firebase_service_1 = require("./service/firebase.service");
exports.FIREBASE_PROVIDER = 'firebase-provider';
let FirebaseModule = class FirebaseModule {
};
exports.FirebaseModule = FirebaseModule;
exports.FirebaseModule = FirebaseModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: exports.FIREBASE_PROVIDER,
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const firebaseConfig = configService.get(firebase_config_1.FIREBASE_CONFIG_TOKEN);
                    firebaseAdmin.initializeApp({
                        credential: firebaseAdmin.credential.cert({
                            privateKey: firebaseConfig.privateKey,
                            projectId: firebaseConfig.projectId,
                            clientEmail: firebaseConfig.clientEmail,
                        }),
                    });
                },
            },
            firebase_service_1.FirebaseService,
        ],
        exports: [firebase_service_1.FirebaseService],
    })
], FirebaseModule);
//# sourceMappingURL=firebase.module.js.map