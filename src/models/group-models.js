import { Sequelize } from "sequelize";
import sequelize from "../database.js";

const Group = sequelize.define(
  "group",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    permissions: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
  },
  {
    timestamps: false,
    tableName: "group",
  }
);

export default Group;
