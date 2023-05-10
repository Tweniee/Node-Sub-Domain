import ResponseMessage from "../../Constants/ResponseMessage";
import { expressRequest, expressResponse } from "../../Dependencies";
import { successResponse } from "../../Helper/Response.helper";
import { createDashboardPropertyService } from "../../Service/Dashboard/Dashboard.Service";

export const createDashboardPropertyController = async (
  req: expressRequest,
  res: expressResponse
) => {
  const { name, role } = req.body;
  const dashboard = await createDashboardPropertyService(name, role);
  return successResponse(res, {
    message: ResponseMessage.DASHBOARD_PROPERTY_CREATED,
    data: dashboard,
  });
};
