import { Sequelize } from 'sequelize-typescript';

interface DBConfig {
  dialect: any;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

export const connectDatabase = (config: DBConfig): Sequelize => {
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: config.port,
      dialect: config.dialect,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      pool: {
        max: 1000,
        min: 0,
        idle: 10000,
      },
      logging: false,
    },
  );

  sequelize
    .authenticate()
    .then(() => {
      console.log(`✅ Connected to database ${config.database} successfully.`);
    })
    .catch((error) => {
      console.error('❌ Unable to connect to the database:', error.message);
    });

  return sequelize;
};
