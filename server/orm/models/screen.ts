import {
  Model,
  Optional,
} from 'sequelize'

export interface ScreenAttributes {
  id: number
  title: string
  savedAsImg: boolean
  shareKey: string
  base64?: string
  path?: string | undefined
  size: number
  private: boolean
  uploadBy: number
  views: number
  deletedAt?: Date
}

interface ScreenCreationAttributes extends Optional<ScreenAttributes, "id"> {}

export class Screen extends Model<ScreenAttributes, ScreenCreationAttributes>
  implements ScreenCreationAttributes {
  public id!: number
  public title!: string
  public savedAsImg!: boolean
  public base64?: string
  public shareKey!: string
  public path?: string
  public uploadBy!: number
  public size!: number
  public private!: boolean
  public views!: number
  public deletedAt?: Date
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
  static associate(models: any) {
    // Screen.belongsTo(models.User, { targetKey: 'id' })
  }
}
module.exports = (sequelize: any, DataTypes: any) => {
  Screen.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    savedAsImg: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    base64: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    path: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
    uploadBy: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    size: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    views: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 0,
    },
    shareKey: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      primaryKey: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'Screens',
  })
  return Screen
}


export default Screen