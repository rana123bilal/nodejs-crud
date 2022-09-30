import crypto from "crypto";
import Group from "../models/group-models.js";

class GroupService {
  async Create(group) {
    const { name, permissions } = group;
    const groupWithId = {
      name,
      permissions: [permissions],
      id: crypto.randomUUID(),
    };
    await Group.create(groupWithId);
    return groupWithId;
  }

  async Get(id) {
    const group = await Group.findByPk(id);
    return group;
  }
  async GetAll() {
    const groups = await Group.findAll();
    return groups;
  }

  async Update(groupBody, id) {
    const group = await Group.findByPk(id);
    const groupId = group.id;
    await Group.Update(groupBody, {
      where: {
        id: groupId,
      },
    });
    return group;
  }

  async Delete(id) {
    const groupId = id;
    const group = await Group.findByPk(id);
    await Group.destroy({
      where: {
        id: groupId,
      },
      force: true,
    });
    return group;
  }
}

export default GroupService;
