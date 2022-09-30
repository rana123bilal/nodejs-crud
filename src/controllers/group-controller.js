import GroupService from "../service/group-service.js";

const groupService = new GroupService();

export const getGroup = async (req, res) => {
    const {id} = req.params;
    const group = await groupService.Get(id);
    if(!group){
        res.status(404).json({message : `Group with this id ${id} does not exist`})  
    }else{
        console.log(group)
        res.status(200).json(group)
    }
};
export const getAllGroups = async (req, res) => {
    const groups = await groupService.GetAll();

    if (!groups.length) {
        res.status(404).json({ message: 'No groups exsisted' });
    } else {
        res.status(200).json(groups);
    }
};

export const createGroup = async (req, res) => {
    const {id, name, permissions} = req.body;
    const newGroup = {id, name, permissions}
    console.log('create group request body',req.body)
    const group = await groupService.Create(newGroup);
    res.status(201).json(group);
};

export const updateGroup = async (req, res) => {
    const { id } = req.params;
    const group = await groupService.Update(req.body, id);

    if (!group) {
        res.status(404).json({ message: `Group with id ${id} not found` });
    }

    res.status(200).json(`Group with id ${id} updated successfully`);
};

export const deleteGroup = async (req, res) => {
    const { id } = req.params;
    const group = await groupService.Delete(id);

    if (!group) {
        res.status(404).json({ message: `Group with id ${id} not found` });
    }

    res.status(204).send();
};
