import sequelize from '../database.js';
import User from './user-model.js';
import Sequelize from 'sequelize';
import Group from './group-models.js';

const UserGroups = sequelize.define("groups-user", {}, {
    timestamps: false,
    tableName: "groups-user",
});

    User.belongsToMany(Group, { through: UserGroups }, {onDelete: 'cascade', hooks:true});
    Group.belongsToMany(User, { through: UserGroups}, {onDelete: 'cascade', hooks:true});

export default UserGroups;