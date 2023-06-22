import ResponseMessage from "../../Constants/ResponseMessage";
import { expressRequest, expressResponse } from "../../Dependencies";
import { successResponse } from "../../Helper/Response.helper";
import {
  getSectionByUserIdService,
  getSectionFiveDataService,
  getSectionFourDataService,
  getSectionOneDataService,
  getSectionThreeDataService,
  getSectionTwoDataService,
  getTemplateDataService,
} from "../../Service/Template/NewTemplate/TemplateContent.Service";

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
  console.log(">>>>>",req.params)
  const { sectionId } = req.params;
  let sections = [];
  sections = await getSectionOneDataService(userId, sectionId);
  if (sections.length == 0) {
    console.log("sectionId",sectionId)
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
