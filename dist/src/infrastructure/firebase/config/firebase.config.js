"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseConfig = exports.FIREBASE_CONFIG_TOKEN = void 0;
const config_1 = require("@nestjs/config");
const process = require("node:process");
exports.FIREBASE_CONFIG_TOKEN = 'firebase-config-token';
exports.firebaseConfig = (0, config_1.registerAs)(exports.FIREBASE_CONFIG_TOKEN, () => {
    const errors = [];
    if (!process.env.FIREBASE_PROJECT_ID) {
        errors.push('FIREBASE_PROJECT_ID not provided');
    }
    if (!process.env.FIREBASE_PRIVATE_KEY) {
        errors.push('FIREBASE_PRIVATE_KEY not provided');
    }
    if (!process.env.FIREBASE_CLIENT_EMAIL) {
        errors.push('FIREBASE_CLIENT_EMAIL not provided');
    }
    if (errors.length > 0) {
        throw new Error(errors.join('\n'));
    }
    return {
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };
});
//# sourceMappingURL=firebase.config.js.map