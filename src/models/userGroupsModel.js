import sequelize from '../database.js';
import User from './user-model.js';
import Sequelize from 'sequelize';
import Group from './group-models.js';

const UserGroups = sequelize.define('user_groups', {}, {
    user_id : {
        type : Sequelize.STRING,
        foriegnKey : true,
    },
    group_id : {
        type : Sequelize.STRING,
        foriegnKey : true,
    },
},{
    timestamps: false,
    tableName: 'user_groups',

});

User.belongsToMany(Group, { through: UserGroups });
Group.belongsToMany(User, { through: UserGroups });

export default UserGroups;
