import { ConfigFactory } from '@nestjs/config';
export interface IFirebaseConfig {
    projectId: string;
    privateKey: string;
    clientEmail: string;
}
export declare const FIREBASE_CONFIG_TOKEN = "firebase-config-token";
export declare const firebaseConfig: ConfigFactory<IFirebaseConfig> & import("@nestjs/config").ConfigFactoryKeyHost<IFirebaseConfig | Promise<IFirebaseConfig>>;
