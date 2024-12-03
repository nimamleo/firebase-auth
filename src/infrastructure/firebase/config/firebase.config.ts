import { ConfigFactory, registerAs } from '@nestjs/config';
import * as process from 'node:process';

export interface IFirebaseConfig {
  projectId: string;
  privateKey: string;
  clientEmail: string;
}

export const FIREBASE_CONFIG_TOKEN = 'firebase-config-token';

export const firebaseConfig = registerAs<
  IFirebaseConfig,
  ConfigFactory<IFirebaseConfig>
>(FIREBASE_CONFIG_TOKEN, () => {
  const errors: string[] = [];

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
