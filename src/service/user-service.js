import crypto from 'crypto';
import Op from 'sequelize';
import User from '../models/user-model.js';
import UserGroups from '../models/userGroupsModel.js';

export default class UserService {
  async Create (user) {
    const userWithId = {
      ...user,
      id: crypto.randomUUID(),
    };
    await User.create(userWithId);
    return userWithId;
  }

  async Get(id) {
    const user = await User.findByPk(id);
    return user;
  }

  async GetUsers() {
    const users = await User.findAll();
    return users;
  }

  async GetSuggested(loginSubstr, limit) {
    const users = await User.findAll({
      where: {
        login: {
          [Op.startsWith]: loginSubstr || "",
        },
      },
      order: [["login", "ASC"]],
      limit: Number(limit) || 10,
    });

    return users;
  }

  async Update(userBody, id) {
    const user = await User.findByPk(id);
    const userId = user.id;
    await User.update(userBody, {
      where: {
        id: userId,
      },
    });
    return user;
  }

  async Delete(id) {
    const userId = id;
    const user = await User.findByPk(id);
    await User.destroy({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async AddUsersToGroup(groupId, userIds) {
    userIds.forEach(async v => {
        await UserGroups.create({ group_id: groupId, user_id: v });
    });

    return userIds;
}
}

