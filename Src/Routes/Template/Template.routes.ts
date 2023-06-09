import UniqueValues from "../../Constants/UniqueValues";
import {
  getSectionValueController,
  getSectionsController,
  getTemplateDataController,
  updateAboutSectionController,
  updateBannerSectionController,
  updateCardsSectionController,
  updateExpSectionController,
  updateGrowthSectionController,
} from "../../Controller/Template/Template.Controller";
import { expressRouter } from "../../Dependencies";
import { asyncMiddleware } from "../../Middleware/AsyncMiddleware";
import { authorize } from "../../Middleware/RBAC/RBAC.Middleware";

const router = expressRouter();

// * <---------------------------------Get Template Content by UserId------------------------------------>
router.get(
  "/getDataById/:userId",
  authorize([UniqueValues.DIETITIAN, UniqueValues.SUPER_ADMIN]),
  asyncMiddleware(getTemplateDataController)
);

// *<----------------------------------Get All Sections--------------------------------------------------->
router.get(
  "/getAllSections",
  authorize([UniqueValues.DIETITIAN, UniqueValues.SUPER_ADMIN]),
  asyncMiddleware(getSectionsController)
);

// *<---------------------------Get Data on base of section Id-------------------------------------------->
router.get(
  "/getSectionData/:sectionId",
  authorize([UniqueValues.DIETITIAN, UniqueValues.SUPER_ADMIN]),
  asyncMiddleware(getSectionValueController)
);

// *<--------------------------------Update Banner Route--------------------------------------------------->
router.patch(
  "/updateBannerSection",
  authorize([UniqueValues.DIETITIAN, UniqueValues.SUPER_ADMIN]),
  asyncMiddleware(updateBannerSectionController)
);

// *<--------------------------------Update Cards Route--------------------------------------------------->
router.patch(
  "/updateCardsSection",
  authorize([UniqueValues.DIETITIAN, UniqueValues.SUPER_ADMIN]),
  asyncMiddleware(updateCardsSectionController)
);

// *<--------------------------------Update Exp Route--------------------------------------------------->
router.patch(
  "/updateExpSection",
  authorize([UniqueValues.DIETITIAN, UniqueValues.SUPER_ADMIN]),
  asyncMiddleware(updateExpSectionController)
);

// *<--------------------------------Update Growth Route--------------------------------------------------->
router.patch(
  "/updateGrowthSection",
  authorize([UniqueValues.DIETITIAN, UniqueValues.SUPER_ADMIN]),
  asyncMiddleware(updateGrowthSectionController)
);

// *<--------------------------------Update About Route--------------------------------------------------->
router.patch(
  "/updateAboutSection",
  authorize([UniqueValues.DIETITIAN, UniqueValues.SUPER_ADMIN]),
  asyncMiddleware(updateAboutSectionController)
);

export default router;
