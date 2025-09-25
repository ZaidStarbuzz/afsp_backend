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
  Default,
} from 'sequelize-typescript';
import { Users } from './users.model';

@Table({
  tableName: 'activity_logs',
  timestamps: true, // enables createdAt & updatedAt
})
export class ActivityLogs extends Model<ActivityLogs> {
  @PrimaryKey
  @Default(DataType.UUIDV4) // ✅ auto-generate UUID
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare event_type: string | null;

  @Column({
    type: DataType.DATE, // timestamptz in PG
    allowNull: true,
  })
  declare event_time: Date | null;

  @CreatedAt
  @Column({ field: 'createdAt', type: DataType.DATE })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt', type: DataType.DATE })
  declare updatedAt: Date;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: true, // matches ON DELETE SET NULL
  })
  declare userId: number | null;

  @BelongsTo(() => Users, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  declare user?: Users;
}
