// src/common/database/models/platform.model.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'platforms',
  timestamps: true,
})
export class Platform extends Model<Platform> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  short_name: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;
}
