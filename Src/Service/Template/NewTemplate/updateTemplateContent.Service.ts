import { Types } from "mongoose";
import { TemplateBannerSectionModel } from "../../../Model/TemplateContent/Banner/Banner.Model";
import { TemplateTextModel } from "../../../Model/TemplateContent/Text/Text.model";
import { TemplateCardSectionModel } from "../../../Model/TemplateContent/Cards/Cards.Model";

export const getOldSectionOneService = async (bannerId: string) => {
  const sectionOne = await TemplateBannerSectionModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(bannerId),
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
    {
      $lookup: {
        from: "templatetexts",
        localField: "text",
        foreignField: "_id",
        as: "text",
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
          {
            $lookup: {
              from: "templatetexts",
              localField: "subHeading",
              foreignField: "_id",
              as: "subHeading",
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
                {
                  $project: {
                    _id: 1,
                    text: 1,
                  },
                },
              ],
            },
          },
          {
            $unwind: {
              path: "$subHeading",
            },
          },
          {
            $project: {
              _id: 1,
              subHeading: 1,
              text: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$text",
      },
    },
  ]);
  return sectionOne[0];
};

export const updateTextService = async (textId: string, text: string) => {
  const updatedText = await TemplateTextModel.findOneAndUpdate(
    { _id: new Types.ObjectId(textId) },
    { text: text },
    { new: true }
  );
  return updatedText;
};

export const updateBannerImageService = async (
  bannerId: string,
  bg_image: string
) => {
  console.log(bannerId, bg_image);
  const bannerImage = await TemplateBannerSectionModel.findOneAndUpdate(
    {
      _id: new Types.ObjectId(bannerId),
    },
    { $set: { bg_Image: bg_image } },
    { new: true }
  );
  console.log(bannerImage);
  return bannerImage;
};

// * Section Two

export const getOldSectionTwoService = async (cardId: string) => {
  const cards = await TemplateCardSectionModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(cardId),
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
    {
      $lookup: {
        from: "templatetexts",
        localField: "text",
        foreignField: "_id",
        as: "text",
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
          {
            $lookup: {
              from: "templatetexts",
              localField: "subHeading",
              foreignField: "_id",
              as: "subHeading",
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
                {
                  $project: {
                    _id: 1,
                    text: 1,
                  },
                },
              ],
            },
          },
          {
            $unwind: {
              path: "$subHeading",
            },
          },
          {
            $project: {
              _id: 1,
              subHeading: 1,
              text: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$text",
      },
    },
  ]);
  return cards[0];
};

export const updateCardIconService = async (cardId: string, icon: string) => {
  const card = await TemplateCardSectionModel.findOneAndUpdate(
    { _id: new Types.ObjectId(cardId) },
    { $set: { icon: icon } }
  );
  return card
};
