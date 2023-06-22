import { Types } from "mongoose";
import { createTemplateBannerService } from "../Banner/Banner.Service";
import { createTemplateCardsService } from "../Cards/Cards.Service";
import { createTemplateExpService } from "../Experience/Experience.Service";
import { createTemplateGrowthService } from "../Growth/Growth.Service";
import { createTemplateAboutService } from "../About/About.Service";
import { TemplateContentModel } from "../../../Model/TemplateContent/TemplateContent.Model";
const cardText = [
  {
    icon: "fas fa-award",
    heading: "Awarded Agency",
    subText:
      "Divide details about your product or agency work into parts. A paragraph describing a feature will be enough.",
  },
  {
    icon: "fas fa-retweet",
    heading: "Free Revisions",
    subText:
      "Keep you user engaged by providing meaningful information. Remember that by this time, the user is curious.",
  },
  {
    icon: "fas fa-fingerprint",
    heading: "Verified Company",
    subText:
      "Write a few lines about each one. A paragraph describing a feature will be enough. Keep you user engaged!",
  },
];
export const createNewTemplateContentService = async (
  userId: Types.ObjectId
) => {
  const banner = await createTemplateBannerService();
  const cards = await createTemplateCardsService(cardText);
  const exp = await createTemplateExpService();
  const growth = await createTemplateGrowthService();
  const about = await createTemplateAboutService();
  const template = await TemplateContentModel.create({
    tabName: "6475c94f9295c30418c077c8",
    sectionOne: banner._id,
    sectionTwo: cards,
    sectionThree: exp._id,
    sectionFour: growth._id,
    sectionFive: about._id,
    dietitian: userId,
  });
  return template;
};

export const getSectionByUserIdService = async (userId: string) => {
  const sections = await TemplateContentModel.findOne({
    dietitian: new Types.ObjectId(userId),
    isActive: true,
    isDeleted: false,
  }).select("sectionOne sectionThree sectionTwo sectionFour sectionFive");
  return sections;
};

export const getSectionOneDataService = async (
  userId: string,
  sectionId: string
) => {
  let section = [];
  if (sectionId.indexOf(",") == -1) {
    section = await TemplateContentModel.aggregate([
      {
        $match: {
          dietitian: new Types.ObjectId(userId),
          sectionOne: new Types.ObjectId(sectionId),
        },
      },
      {
        $lookup: {
          from: "templatebannersections",
          localField: "sectionOne",
          foreignField: "_id",
          as: "sectionOne",
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
                  {
                    $addFields: {
                      subHeading: "$subHeading.text",
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
              $addFields: {
                subHeading: "$text.subHeading",
                text: "$text.text",
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$sectionOne",
        },
      },
      {
        $project: {
          sectionOne: 1,
        },
      },
    ]);
  }
  return section;
};
export const getSectionTwoDataService = async (
  userId: string,
  sectionId: string
) => {
  const sectionIds = sectionId.split(",");
  let section = await TemplateContentModel.aggregate([
    {
      $match: {
        dietitian: new Types.ObjectId(userId),
        $and: [
          {
            sectionTwo: new Types.ObjectId(sectionIds[0]),
          },
          {
            sectionTwo: new Types.ObjectId(sectionIds[1]),
          },
          {
            sectionTwo: new Types.ObjectId(sectionIds[2]),
          },
        ],
      },
    },
    {
      $lookup: {
        from: "templatecardsections",
        localField: "sectionTwo",
        foreignField: "_id",
        as: "sectionTwo",
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
                {
                  $addFields: {
                    subHeading: "$subHeading.text",
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
            $addFields: {
              subHeading: "$text.subHeading",
              text: "$text.text",
            },
          },
        ],
      },
    },
    {
      $project: {
        sectionTwo: 1,
      },
    },
  ]);
  return section;
};
export const getSectionThreeDataService = async (
  userId: string,
  sectionId: string
) => {
  let section = await TemplateContentModel.aggregate([
    {
      $match: {
        dietitian: new Types.ObjectId(userId),
        sectionThree: new Types.ObjectId(sectionId),
      },
    },
    {
      $lookup: {
        from: "templateexperiencesections",
        localField: "sectionThree",
        foreignField: "_id",
        as: "sectionThree",
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
                {
                  $addFields: {
                    subHeading: "$subHeading.text",
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
            $addFields: {
              subHeading: "$text.subHeading",
              text: "$text.text",
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
                {
                  $addFields: {
                    subHeading: "$subHeading.text",
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
          {
            $addFields: {
              imageSubHeading: "$imageText.subHeading",
              imageText: "$imageText.text",
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$sectionThree",
      },
    },
    {
      $project: {
        sectionThree: 1,
      },
    },
  ]);
  return section;
};
export const getSectionFourDataService = async (
  userId: string,
  sectionId: string
) => {
  let section = await TemplateContentModel.aggregate([
    {
      $match: {
        dietitian: new Types.ObjectId(userId),
        sectionFour: new Types.ObjectId(sectionId),
      },
    },
    {
      $lookup: {
        from: "templategrowthsections",
        localField: "sectionFour",
        foreignField: "_id",
        as: "sectionFour",
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
                {
                  $addFields: {
                    subHeading: "$subHeading.text",
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
            $addFields: {
              subHeading: "$text.subHeading",
              text: "$text.text",
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$sectionFour",
      },
    },
    {
      $project: {
        sectionFour: 1,
      },
    },
  ]);
  return section;
};
export const getSectionFiveDataService = async (
  userId: string,
  sectionId: string
) => {
  let section = await TemplateContentModel.aggregate([
    {
      $match: {
        dietitian: new Types.ObjectId(userId),
        sectionFive: new Types.ObjectId(sectionId),
      },
    },
    {
      $lookup: {
        from: "templateaboutsections",
        localField: "sectionFive",
        foreignField: "_id",
        as: "sectionFive",
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
              from: "templatecardsections",
              localField: "cards",
              foreignField: "_id",
              as: "cards",
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
                      {
                        $addFields: {
                          subHeading: "$subHeading.text",
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
                  $addFields: {
                    subHeading: "$text.subHeading",
                    text: "$text.text",
                  },
                },
              ],
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
                {
                  $addFields: {
                    subHeading: "$subHeading.text",
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
            $addFields: {
              subHeading: "$text.subHeading",
              text: "$text.text",
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$sectionFive",
      },
    },
    {
      $project: {
        sectionFive: 1,
      },
    },
  ]);
  return section;
};

export const getTemplateDataService = async (userId: string) => {
  const data = await TemplateContentModel.aggregate([
    {
      $match: {
        dietitian: new Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "dashboards",
        localField: "tabName",
        foreignField: "_id",
        as: "tabName",
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
        path: "$tabName",
      },
    },
    {
      $lookup: {
        from: "templatebannersections",
        localField: "sectionOne",
        foreignField: "_id",
        as: "sectionOne",
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
                {
                  $addFields: {
                    subHeading: "$subHeading.text",
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
            $addFields: {
              subHeading: "$text.subHeading",
              text: "$text.text",
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$sectionOne",
      },
    },
    {
      $lookup: {
        from: "templatecardsections",
        localField: "sectionTwo",
        foreignField: "_id",
        as: "sectionTwo",
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
                {
                  $addFields: {
                    subHeading: "$subHeading.text",
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
            $addFields: {
              subHeading: "$text.subHeading",
              text: "$text.text",
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "templateexperiencesections",
        localField: "sectionThree",
        foreignField: "_id",
        as: "sectionThree",
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
                {
                  $addFields: {
                    subHeading: "$subHeading.text",
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
            $addFields: {
              subHeading: "$text.subHeading",
              text: "$text.text",
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
                {
                  $addFields: {
                    subHeading: "$subHeading.text",
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
          {
            $addFields: {
              imageSubHeading: "$imageText.subHeading",
              imageText: "$imageText.text",
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$sectionThree",
      },
    },
    {
      $lookup: {
        from: "templategrowthsections",
        localField: "sectionFour",
        foreignField: "_id",
        as: "sectionFour",
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
                {
                  $addFields: {
                    subHeading: "$subHeading.text",
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
            $addFields: {
              subHeading: "$text.subHeading",
              text: "$text.text",
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$sectionFour",
      },
    },
    {
      $lookup: {
        from: "templateaboutsections",
        localField: "sectionFive",
        foreignField: "_id",
        as: "sectionFive",
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
              from: "templatecardsections",
              localField: "cards",
              foreignField: "_id",
              as: "cards",
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
                      {
                        $addFields: {
                          subHeading: "$subHeading.text",
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
                  $addFields: {
                    subHeading: "$text.subHeading",
                    text: "$text.text",
                  },
                },
              ],
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
                {
                  $addFields: {
                    subHeading: "$subHeading.text",
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
            $addFields: {
              subHeading: "$text.subHeading",
              text: "$text.text",
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$sectionFive",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "dietitian",
        foreignField: "_id",
        as: "dietitian",
        pipeline: [
          {
            $match: {
              isActive: true,
              isDeleted: false,
            },
          },
          {
            $lookup: {
              from: "roles",
              localField: "role",
              foreignField: "_id",
              as: "role",
              pipeline: [
                {
                  $match: {
                    isActive: true,
                    isDeleted: false,
                  },
                },
              ],
            },
          },
          {
            $unwind: {
              path: "$role",
            },
          },
          {
            $addFields: {
              role: "$role.name",
            },
          },
          {
            $project: {
              password: 0,
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
        path: "$dietitian",
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
  return data;
};
