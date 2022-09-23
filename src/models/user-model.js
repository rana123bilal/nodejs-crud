import Sequelize from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'users',
  username: '',
  password: 'admin',
});

export const User = sequelize.define('user', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    login: Sequelize.STRING,
    age: Sequelize.NUMBER,
    password: Sequelize.STRING,
    isDeleted : Sequelize.BOOLEAN

}, {
    timestamps: false,
    tableName: 'user'
});
