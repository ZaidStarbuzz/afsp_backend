import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Users } from './users.model';

@Table({
  tableName: 'login_records',
  timestamps: true, // createdAt & updatedAt handled automatically
})
export class LoginRecords extends Model<LoginRecords> {
  @PrimaryKey
  @AutoIncrement // uses nextval('login_records_id_seq')
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  auth_id: string;

  @CreatedAt
  @Column({ field: 'createdAt', type: DataType.DATE })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt', type: DataType.DATE })
  declare updatedAt: Date;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId: number;

  @BelongsTo(() => Users, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  user: Users;
}
