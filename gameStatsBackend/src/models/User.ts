import { Model, DataTypes, Sequelize } from "sequelize";
import {
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from "sequelize";
import { New } from "./New";
import sequelize from "./index";

export class User extends Model {
  public id!: string;
  public username!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getNews!: HasManyGetAssociationsMixin<New>;
  public addNew!: HasManyAddAssociationMixin<New, number>;
  public hasNew!: HasManyHasAssociationMixin<New, number>;
  public countNews!: HasManyCountAssociationsMixin;
  public createNew!: HasManyCreateAssociationMixin<New>;

  public readonly news?: New[];

  public static associations: {
    news: Association<User, New>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.STRING(100),
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize: sequelize,
  }
);

User.hasMany(New, {
  sourceKey: "id",
  foreignKey: "ownerId",
  as: "news",
});
