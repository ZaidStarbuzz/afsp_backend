import { Provider } from '@nestjs/common';
import initModels from '../database/initModels';

export interface Models {
  initModels: any;
}

let cachedinitModels: any = null;

export const Models: Provider = {
  provide: 'MODELS',
  useFactory: async () => {
    if (cachedinitModels) {
      console.log('Returning cached Models instance');
      return { prjModels: cachedinitModels };
    }
    console.log('Initializing new Models instance');
    const dialect = process.env.DB_DIALECT;
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT ?? '5432';
    const database =
      process.env.NODE_ENV === 'production'
        ? process.env.DB_PROD
        : process.env.DB_DEV;
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;

    if (!dialect || !host || !database || !username || !password) {
      throw new Error('Missing required database environment variables.');
    }

    const prj = await initModels({
      dialect,
      host,
      port,
      database,
      username,
      password,
    });

    cachedinitModels = prj;
    return { prjModels: cachedinitModels };
  },
};
