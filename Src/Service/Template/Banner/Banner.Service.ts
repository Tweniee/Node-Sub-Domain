import { TemplateBannerSectionModel } from "../../../Model/TemplateContent/Banner/Banner.Model";
import { createTemplateTextService } from "../Text/Text.Service";

export const createTemplateBannerService = async () => {
  const text = await createTemplateTextService(
    "This is a simple example of a Landing Page you can build using Notus Angular. It features multiple CSS components based on the Tailwind CSS design system.",
    "Your story starts with us."
  );
  const banner = await TemplateBannerSectionModel.create({
    bg_Image: "bg_Banner.avif",
    text: text._id,
  });
  return banner;
};
