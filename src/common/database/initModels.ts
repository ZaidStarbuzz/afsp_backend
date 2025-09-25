import { connectDatabase } from '../../utils/databaseUtil';
import { LoginRequests } from './models/loginRequests.model';
import { Platform } from './models/platform.model';
import { Users } from './models/users.model';
import { Login as Logins } from './models/Logins.model';
import { LoginRecords } from './models/loginRecords.model';
import { ActivityLogs } from './models/activity-logs.model';

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
  sequelize.addModels([
    Platform,
    LoginRequests,
    Users,
    Logins,
    LoginRecords,
    ActivityLogs,
  ]);
  const influencer: any = {};
  influencer.sequelize = sequelize;
  influencer.Platforms = Platform;
  influencer.LoginRequests = LoginRequests;
  influencer.Users = Users;
  influencer.Logins = Logins;
  influencer.LoginRecords = LoginRecords;
  influencer.ActivityLogs = ActivityLogs;

  return influencer;
}
