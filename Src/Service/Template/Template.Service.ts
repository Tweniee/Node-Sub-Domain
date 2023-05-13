import { Types } from "mongoose";
import { TemplateContentModel } from "../../Model/Index";
import { getTheRoleByUserIdService } from "../Users/Users.Service";
import { getAllPermissionService } from "../Dashboard/Dashboard.Service";
import UniqueValues from "../../Constants/UniqueValues";

interface IContentBodyInfo {
  tabName: Types.ObjectId;
  parentTab?: Types.ObjectId;
  children?: Types.ObjectId[];
  dietitian: Types.ObjectId;
  title: string;
  subTitle: string;
  description: string;
}

export const createTemplateContentService = async (
  body: IContentBodyInfo,
  parentId: Types.ObjectId
) => {
  const content = await TemplateContentModel.create(body);
  await updateParentService(parentId, content._id);
  return content;
};

export const updateParentService = async (
  parentId: Types.ObjectId,
  _id: Types.ObjectId
) => {
  const updatedParent = await TemplateContentModel.findOneAndUpdate(
    {
      _id: new Types.ObjectId(parentId),
    },
    { $push: { children: _id } },
    { new: true }
  );
  return updatedParent;
};

export const checkForPermissionService = async (
  userId: Types.ObjectId,
  permission: string
): Promise<boolean> => {
  // *Getting Role from userId
  const { role } = await getTheRoleByUserIdService(userId);
  // *Checking the roleId is has the permission for the operation
  const { permissionId } = await getAllPermissionService(role);
  if (permission == UniqueValues.CREATE_PERMISSION) {
    return permissionId.canCreate;
  } else if (permission == UniqueValues.READ_PERMISSION) {
    return permissionId.canRead;
  } else if (permission == UniqueValues.UPDATE_PERMISSION) {
    return permissionId.canUpdate;
  } else if (permission == UniqueValues.DELETE_PERMISSION) {
    return permissionId.canDelete;
  } else {
    return false;
  }
};

export const getAllTemplateContentService = async () => {
  const content = await TemplateContentModel.aggregate([
    {
      $match: {
        isActive: true,
        isDeleted: false,
        parentTab: null,
      },
    },
    {
      $project: {
        isActive: 0,
        isDeleted: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
    {
      $lookup: {
        from: "templatecontents",
        localField: "children",
        foreignField: "_id",
        as: "children",
        pipeline: [
          {
            $match: {
              parentTab: { $ne: null },
              isActive: true,
              isDeleted: false,
            },
          },
          {
            $project: {
              isActive: 0,
              isDeleted: 0,
              parentTab: 0,
              createdAt: 0,
              updatedAt: 0,
            },
          },
        ],
      },
    },
  ]);
  return content;
};

export const getContentByContentIDService = async (_id: Types.ObjectId) => {
  const content = await TemplateContentModel.aggregate([
    {
      $match: {
        _id: { $eq: new Types.ObjectId(_id) },
        isActive: false,
        isDeleted: true,
      },
    },
    {
      $project: {
        isActive: 0,
        isDeleted: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
    {
      $lookup: {
        from: "templatecontents",
        localField: "children",
        foreignField: "_id",
        as: "children",
        pipeline: [
          {
            $match: {
              parentTab: { $ne: null },
              isActive: true,
              isDeleted: false,
            },
          },
          {
            $project: {
              isActive: 0,
              isDeleted: 0,
              parentTab: 0,
              createdAt: 0,
              updatedAt: 0,
            },
          },
        ],
      },
    },
  ]);
  return content;
};

export const updateTemplateContentService = async (
  contentId: Types.ObjectId,
  title: string,
  description: string,
  subTitle?: string
) => {
  if (subTitle) {
    const updatedContent = await TemplateContentModel.findOneAndUpdate(
      { _id: { $eq: new Types.ObjectId(contentId) } },
      { $set: { title, description, subTitle } },
      { new: true, upsert: true }
    );
    return updatedContent;
  }
  const updatedContent = await TemplateContentModel.findOneAndUpdate(
    { _id: { $eq: new Types.ObjectId(contentId) } },
    { $set: { title, description } },
    { new: true }
  );
  return updatedContent;
};

export const deleteTemplateContentService = async (
  contentId: Types.ObjectId
) => {
  const updatedContent = await TemplateContentModel.findOneAndUpdate(
    {
      _id: { $eq: new Types.ObjectId(contentId) },
      isDeleted: false,
      isActive: true,
    },
    { $set: { isDeleted: true, isActive: false } },
    { new: true }
  );
  return updatedContent;
};

export const restoreTemplateContentService = async (
  contentId: Types.ObjectId
) => {
  const updatedContent = await TemplateContentModel.findOneAndUpdate(
    {
      _id: { $eq: new Types.ObjectId(contentId) },
      isDeleted: true,
      isActive: false,
    },
    { $set: { isDeleted: false, isActive: true } },
    { new: true }
  );
  return updatedContent;
};
