import { connectDatabase } from '../../utils/databaseUtil';
import { Platform } from './models/platform.model';

export default async function initModels(config: {
  dialect: string;
  host: string;
  port: string | number;
  database: string;
  username: string;
  password: string;
}) {
  const sequelize = connectDatabase({
    dialect: config.dialect,
    host: config.host,
    port: Number(config.port),
    database: config.database,
    username: config.username,
    password: config.password,
  });
  sequelize.addModels([Platform]);
  const influencer: any = {};
  influencer.sequelize = sequelize;
  influencer.Platforms = Platform;

  return influencer;
}
