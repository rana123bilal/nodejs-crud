import crypto from "crypto";
import sequelize from "../database";
import User from "../models/user-model";
import UserGroups from "../models/userGroupsModel";

type UserType = {
  id: string;
  login: string;
  age: number;
  password: string;
  isDeleted: boolean;
};

export default class UserService {
  async Create(user: UserType) {
    const userWithId = {
      ...user,
      id: crypto.randomUUID(),
    };
    await User.create(userWithId);
    return userWithId;
  }

  async Get(id: string) {
    const user = await User.findByPk(id);
    return user;
  }

  async GetUserLogin(username: string) {
    const user = await User.findOne({ where: { login: username }, raw: true });
    console.log("get user login info", user);
    return user;
  }

  async GetUsers() {
    const users = await User.findAll();
    return users;
  }

  async Update(userBody: any, id: string) {
    const user = await User.update(userBody, {
      where: { id },
    });
    return user;
  }

  async Delete(id: string) {
    const user = await User.destroy({
      where: { id },
    });
    return user;
  }

  async AddUsersToGroup(groupIds: string, userIds: string[]) {
    const userGroupsData = userIds.map(
      (id: any) =>
        (id = { id: crypto.randomUUID(), groupId: groupIds, userId: id })
    );

    try {
      let userGroup;
      await sequelize.transaction(async (v) => {
        userGroup = await UserGroups.bulkCreate(userGroupsData, {
          transaction: v,
        });
      });

      return userGroup;
    } catch (error) {
      throw new Error(error);
    }
  }
}
