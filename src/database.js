import Sequelize from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "users",
  username: "",
  password: "admin",
});

export default sequelize;
