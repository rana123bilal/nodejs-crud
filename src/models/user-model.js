import Sequelize from 'sequelize';
import sequelize from '../database';

const User = sequelize.define('user', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  login: Sequelize.STRING,
  age: Sequelize.NUMBER,
  password: Sequelize.STRING,
  isDeleted: Sequelize.BOOLEAN,
}, {
  timestamps: false,
  tableName: 'user',
});

export default User;
