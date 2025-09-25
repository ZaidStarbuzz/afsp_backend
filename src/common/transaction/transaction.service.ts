import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TransactionService {
  constructor(@Inject('MODELS') private readonly models) {}

  async runInTransaction<T>(
    db: string,
    work: (transaction: any) => Promise<T>,
  ): Promise<T> {
    const sequelize: Sequelize = this.models[db].sequelize;
    // const sequelize: Sequelize = this.models.sequelize;
    const transaction = await sequelize.transaction();
    try {
      const result = await work(transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
