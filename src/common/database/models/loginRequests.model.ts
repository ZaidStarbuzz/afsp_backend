import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';

@Table({
  tableName: 'login_requests',
  timestamps: false, // Sequelize won't auto-add createdAt/updatedAt
})
export class LoginRequests extends Model<LoginRequests> {
  @Column({ type: DataType.STRING, allowNull: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  phone: string;

  @Column({ type: DataType.STRING, allowNull: false })
  otp: string;

  @Column({ type: DataType.DATE, allowNull: false })
  expires_in: Date;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  is_processed: boolean;

  @Default(0)
  @Column({ type: DataType.INTEGER })
  type: number;

  // ✅ Use 'declare' to tell TS this property exists
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  declare createdAt: Date;
}
