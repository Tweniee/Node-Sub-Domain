import ResponseMessage from "../../Constants/ResponseMessage";
import StatusCodes from "../../Constants/StatusCodes";
import path from "path";
import { expressRequest, expressResponse } from "../../Dependencies";
import { errorResponse, successResponse } from "../../Helper/Response.helper";
import {
  getAllServicesService,
  getServiceByServiceIdService,
  getServiceByServiceName,
  serviceCreateService,
  serviceUpdateService,
} from "../../Service/Services/Services.Service";
import { transformImageName } from "../../Helper/fileUpload/fileUpload.helper";

// * A Super Admin will create service that out portal will provide
// * Dietitian then can select these service and provide services
export const createServiceController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { name, description } = req.body;
  if (!req.files || Object.keys(req.files).length === 0) {
    return errorResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      message: ResponseMessage.NO_FILE_UPLOAD,
      errors: {},
    });
  }

  const file: any = req.files.image;
  // Handle the uploaded file as needed
  file.mv(
    path.join(__dirname, "/../../uploads/", transformImageName(file.name)),
    async (error: Error) => {
      if (error) {
        console.error(error);
        console.log({ message: "Error uploading file" });
        return;
      }

      // File successfully uploaded
      console.log({ message: "File uploaded successfully" });
      const image = transformImageName(file.name);
      const service = await serviceCreateService(name, description, image);
      if (!service) {
        return errorResponse(res, {
          statusCode: StatusCodes.CONFLICT,
          message: ResponseMessage.SERVICE_ALREADY_EXISTS,
          errors: {},
        });
      }
      return successResponse(res, {
        message: ResponseMessage.SERVICE_CREATED_SUCCESSFULLY,
        data: service,
      });
    }
  );
};

// * A Super Admin will update a service that out portal is providing
// * Dietitian then can select these service and provide services
export const updateServiceController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { name, description, serviceId, image = null } = req.body;
  // Handle the uploaded file as needed
  let images = "";
  if (!req.files || Object.keys(req.files).length === 0) {
    images = image;
    const service = await serviceUpdateService(
      name,
      description,
      serviceId,
      images
    );
    if (!service) {
      return errorResponse(res, {
        statusCode: StatusCodes.CONFLICT,
        message: ResponseMessage.SERVICE_NOT_FOUND,
        errors: {},
      });
    }
    return successResponse(res, {
      message: ResponseMessage.SERVICE_UPDATED_SUCCESSFULLY,
      data: service,
    });
  } else {
    const file: any = req.files.image;
    file.mv(
      path.join(__dirname, "/../../uploads/", transformImageName(file.name)),
      async (error: Error) => {
        if (error) {
          console.error(error);
          console.log({ message: "Error uploading file" });
          return;
        }

        // File successfully uploaded
        console.log({ message: "File uploaded successfully" });
        images = transformImageName(file.name);
        const service = await serviceUpdateService(
          name,
          description,
          serviceId,
          images
        );
        if (!service) {
          return errorResponse(res, {
            statusCode: StatusCodes.CONFLICT,
            message: ResponseMessage.SERVICE_NOT_FOUND,
            errors: {},
          });
        }
        return successResponse(res, {
          message: ResponseMessage.SERVICE_UPDATED_SUCCESSFULLY,
          data: service,
        });
      }
    );
  }
};

// * All users will be able to get all services that our portal offers
export const getAllServiceController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const service = await getAllServicesService();
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: service,
  });
};

// * All users will be able to get Single service by there ID
export const getServiceByIdController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { serviceId } = req.params;
  const service = await getServiceByServiceIdService(serviceId);
  return successResponse(res, {
    message: ResponseMessage.SUCCESS,
    data: service,
  });
};

// * Search Service that are available
export const searchServiceController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { name } = req.body;
  const service = await getServiceByServiceName(name);
  return successResponse(res, {
    message: ResponseMessage.SEARCHED_RESULT,
    data: service,
  });
};
