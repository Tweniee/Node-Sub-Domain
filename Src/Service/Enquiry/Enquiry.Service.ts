import { Enquiry } from "../../Interface/Enquiry.Interface";
import { EnquiryModel } from "../../Model/Index";

export const createEnquiryService = async (body: Enquiry) => {
  const enquiry = await EnquiryModel.create(body);
  return enquiry;
};

export const getAllEnquiryService = async () => {
  const enquiry = await EnquiryModel.aggregate([
    {
      $match: {
        isActive: true,
        isDeleted: false,
      },
    },
    {
      $lookup: {
        from: "services",
        localField: "goal",
        foreignField: "_id",
        as: "goal",
        pipeline: [
          {
            $match: {
              isActive: true,
              isDeleted: false,
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
        ],
      },
    },
    {
      $unwind: {
        path: "$goal",
      },
    },
    {
      $addFields: {
        goal: "$goal.name",
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
  ]);
  return enquiry;
};
