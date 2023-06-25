import { Types } from "mongoose";
import { TemplateBannerSectionModel } from "../../../Model/TemplateContent/Banner/Banner.Model";
import { TemplateTextModel } from "../../../Model/TemplateContent/Text/Text.model";
import { TemplateCardSectionModel } from "../../../Model/TemplateContent/Cards/Cards.Model";
import { TemplateExperienceSectionModel } from "../../../Model/TemplateContent/Experience/Experience.Model";
import { TemplateGrowthSectionModel } from "../../../Model/TemplateContent/Growth/Growth.Model";
import { types } from "joi";
import TemplateAboutSectionModel from "../../../Model/TemplateContent/About/About.Model";

// * Section Text

export const updateTextService = async (textId: string, text: string) => {
  const updatedText = await TemplateTextModel.findOneAndUpdate(
    { _id: new Types.ObjectId(textId) },
    { text: text },
    { new: true }
  );
  return updatedText;
};

// *Section One
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
  return card;
};

// * Section Three

export const getOldSectionThreeService = async (expId: string) => {
  const exp = await TemplateExperienceSectionModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(expId),
        isActive: true,
        isDeleted: false,
      },
    },
    {
      $project:
        /**
         * specifications: The fields to
         *   include or exclude.
         */
        {
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
    {
      $lookup: {
        from: "templatetexts",
        localField: "imageText",
        foreignField: "_id",
        as: "imageText",
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
        path: "$imageText",
      },
    },
  ]);
  return exp[0];
};

export const updateExpSectionService = async (
  expId: string,
  bg_Color: string,
  icon: string,
  cardImage: string
) => {
  const exp = await TemplateExperienceSectionModel.findOneAndUpdate(
    { _id: new Types.ObjectId(expId) },
    { $set: { bg_Color, icon, cardImage } },
    { new: true }
  );
  return exp;
};

// * Section Four
export const getOldSectionFourService = async (growthId: string) => {
  const growth = await TemplateGrowthSectionModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(growthId),
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
  return growth[0];
};

export const updateGrowthSectionService = async (
  growthId: string,
  bulletIcons: string,
  bulletPoints: string,
  icon: string,
  cardImage: string
) => {
  const growth = await TemplateGrowthSectionModel.findOneAndUpdate(
    { _id: new Types.ObjectId(growthId) },
    { $set: { bulletIcons, bulletPoints, icon, cardImage } },
    { new: true }
  );
  return growth;
};

// * Section five
export const getOldSectionFiveService = async (aboutId: string) => {
  const about = await TemplateAboutSectionModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(aboutId),
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
        cards: 0,
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
            $match:
              /**
               * query: The query in MQL.
               */
              {
                isActive: true,
                isDeleted: false,
              },
          },
          {
            $project:
              /**
               * specifications: The fields to
               *   include or exclude.
               */
              {
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
                  $match:
                    /**
                     * query: The query in MQL.
                     */
                    {
                      isActive: true,
                      isDeleted: false,
                    },
                },
                {
                  $project:
                    /**
                     * specifications: The fields to
                     *   include or exclude.
                     */
                    {
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
  return about[0];
};
