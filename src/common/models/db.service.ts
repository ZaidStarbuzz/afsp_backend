import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DbService implements OnModuleInit {
  constructor(@Inject('MODELS') private readonly models) {}

  async onModuleInit() {
    const sequelize = this.models.prjModels.sequelize;

    try {
      // await sequelize.sync({ alter: true });
      // console.log('✅ Successfully synced the inf database!');
    } catch (error) {
      console.error('❌ Error syncing the database:', error);
    }
  }
}
