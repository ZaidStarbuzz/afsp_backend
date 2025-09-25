import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { Users } from './users.model';

@Table({
  tableName: 'logins',
  timestamps: true,
})
export class Login extends Model<Login> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  auth_id: string;

  // Foreign key to User
  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId: number;

  @BelongsTo(() => Users, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  user: Users;
}
