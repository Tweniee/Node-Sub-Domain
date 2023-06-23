import ResponseMessage from "../../Constants/ResponseMessage";
import { expressRequest, expressResponse } from "../../Dependencies";
import { errorResponse, successResponse } from "../../Helper/Response.helper";
import path from "path";
import { transformImageName } from "../../Helper/fileUpload/fileUpload.helper";
import {
  getSectionByUserIdService,
  getSectionFiveDataService,
  getSectionFourDataService,
  getSectionOneDataService,
  getSectionThreeDataService,
  getSectionTwoDataService,
  getTemplateDataService,
} from "../../Service/Template/NewTemplate/TemplateContent.Service";
import {
  getOldSectionOneService,
  getOldSectionTwoService,
  updateBannerImageService,
  updateCardIconService,
  updateTextService,
} from "../../Service/Template/NewTemplate/updateTemplateContent.Service";
import StatusCodes from "../../Constants/StatusCodes";

export const getTemplateDataController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { userId } = req.params;
  const templateData = await getTemplateDataService(userId);

  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: templateData[0],
  });
};

export const getSectionsController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { userId } = req;
  const sections = await getSectionByUserIdService(userId);
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: sections,
  });
};

export const getSectionValueController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { userId } = req;
  const { sectionId } = req.params;
  let sections = [];
  sections = await getSectionOneDataService(userId, sectionId);
  if (sections.length == 0) {
    sections = await getSectionTwoDataService(userId, sectionId);
  }
  if (sections.length == 0) {
    sections = await getSectionThreeDataService(userId, sectionId);
  }
  if (sections.length == 0) {
    sections = await getSectionFourDataService(userId, sectionId);
  }
  if (sections.length == 0) {
    sections = await getSectionFiveDataService(userId, sectionId);
  }
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: sections[0],
  });
};

export const updateBannerSectionController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { _id, bg_Image, subHeading, text } = req.body;
  const sectionData = await getOldSectionOneService(_id);
  await updateTextService(sectionData.text._id, text);
  await updateTextService(sectionData.text.subHeading._id, subHeading);
  let images = "";
  if (!req.files || Object.keys(req.files).length === 0) {
    images = bg_Image;
    const bannerImage = await updateBannerImageService(_id, images);
    return successResponse(res, {
      message: ResponseMessage.SUCCESS,
      data: bannerImage,
    });
  } else {
    const file: any = req.files.bg_Image;
    file.mv(
      path.join(__dirname, "/../../uploads/", transformImageName(file.name)),
      async (error: Error) => {
        if (error) {
          console.error(error);
          console.log({ message: ResponseMessage.ERROR_FILE_UPLOAD });
          return errorResponse(res, {
            statusCode: StatusCodes.BAD_REQUEST,
            message: ResponseMessage.ERROR_FILE_UPLOAD,
            errors: error,
          });
        }

        // File successfully uploaded
        console.log({ message: "File uploaded successfully" });
        images = transformImageName(file.name);
        const bannerImage = await updateBannerImageService(_id, images);
        return successResponse(res, {
          message: ResponseMessage.SERVICE_UPDATED_SUCCESSFULLY,
          data: bannerImage,
        });
      }
    );
  }
};

export const updateCardsSectionController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const {
    items: items,
  }: {
    items: {
      icon: string;
      subHeading: string;
      text: string;
      _id: string;
    }[];
  } = req.body;
  items.forEach(async (item) => {
    const { icon, subHeading, text, _id } = item;
    const sectionData = await getOldSectionTwoService(_id);
    await updateTextService(sectionData.text._id, text);
    await updateTextService(sectionData.text.subHeading._id, subHeading);
    await updateCardIconService(_id, icon);
  });
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: items,
  });
};
