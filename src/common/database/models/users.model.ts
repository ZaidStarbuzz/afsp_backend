import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true, // Sequelize will manage createdAt & updatedAt
})
export class Users extends Model<Users> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true, // uses sequence
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare mobile: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare password: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare profile_pic: string | null;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_active: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare fcm: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  declare session_id: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  declare last_active: Date | null;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare gpt_tour: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  declare referral_code: string | null;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare referred_by: number | null;

  @BelongsTo(() => Users, 'referred_by')
  declare referrer?: Users;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  declare geo_location: Record<string, any> | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare location: string | null;
}
