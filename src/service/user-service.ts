import crypto from "crypto";
import User from "../models/user-model";
import UserGroups from "../models/userGroupsModel";


export default class UserService {
  async Create(user:any) {
    const userWithId = {
      ...user,
      id: crypto.randomUUID(),
    };
    await User.create(userWithId);
    return userWithId;
  }

  async Get(id:string) {
    const user = await User.findByPk(id);
    return user;
  }

  async GetUsers() {
    const users = await User.findAll();
    return users;
  }


  async Update(userBody:any, id: string) {
    const user:any = await User.findByPk(id);
    const userId = user.id;
    await User.update(userBody, {
      where: {
        id: userId,
      },
    });
    return user;
  }

  async Delete(id : string) {
    const userId = id;
    const user = await User.findByPk(id);
    await User.destroy({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async AddUsersToGroup(group_id : string, user_ids : string[]) {
    let res;
    user_ids.forEach(async (uid : string) => {
      res = await UserGroups.create({
        id: crypto.randomUUID(),
        groupId: group_id,
        userId: uid,
      });
    });
    return user_ids;
  }
}
