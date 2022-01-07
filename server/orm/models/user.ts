import {
  Association,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Model,
  Optional,
} from 'sequelize'
import { Screen } from './screen'

export type UserRole = 'user' | 'admin'

export interface UserAttributes {
  id: number
  email: string
  password: string
  role: UserRole
  key: string
  registerIp: string
  lastLoginIp: string
  validated: boolean
  validatedAt: Date
  metadata: Record<string, unknown>
  lastLogin: Date
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<
  UserAttributes,
  'id' | 'lastLogin' | 'metadata' | 'validatedAt'> {}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserCreationAttributes {
    public id!: number
    public email!: string
    public password!: string
    public role!: UserRole
    public key!: string
    public registerIp!: string
    public lastLoginIp!: string
    public validated!: boolean
    public validatedAt?: Date
    public metadata?: Record<string, unknown>
    public lastLogin!: Date
    
    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    
    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    public getScreens!: HasManyGetAssociationsMixin<Screen> // Note the null assertions!
    public addScreen!: HasManyAddAssociationMixin<Screen, number>
    public hasScreen!: HasManyHasAssociationMixin<Screen, number>
    public countScreens!: HasManyCountAssociationsMixin
    
    public readonly screens?: Screen[]
    
    public static associations: {
      screens: Association<User, Screen>;
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    key: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin']
    },
    registerIp: {
      type: DataTypes.STRING
    },
    lastLoginIp: {
      type: DataTypes.STRING
    },
    validated: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      allowNull: false
    },
    validatedAt: {
      type: DataTypes.DATE
    },
    metadata: {
      type: DataTypes.JSON,
      defaultValue: '{}'
    },
    lastLogin: {
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'Users',
  })
  return User
}
/*User.hasMany(Screen, {
  sourceKey: 'id',
  foreignKey: 'uploadBy',
  as: 'screens',
});*/

