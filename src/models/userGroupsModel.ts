import sequelize from '../database';
import User from './user-model';
import Group from './group-models';


const UserGroups = sequelize.define("groups-user", {}, {
    timestamps: false,
    tableName: "groups-user",
});

    User.belongsToMany(Group, { through: UserGroups });
    Group.belongsToMany(User, { through: UserGroups});

export default UserGroups;