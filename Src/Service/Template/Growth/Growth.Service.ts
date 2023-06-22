import { TemplateGrowthSectionModel } from "../../../Model/TemplateContent/Growth/Growth.Model";
import { createTemplateTextService } from "../Text/Text.Service";

export const createTemplateGrowthService = async () => {
  const text = await createTemplateTextService(
    "The extension comes with three pre-built pages to help you get started faster. You can change the text and images and you're good to go.",
    "A growing company"
  );
  const growth = await TemplateGrowthSectionModel.create({
    text: text._id,
    icon: "fas fa-rocket",
    cardImage: "desk.avif",
    bulletPoints:
      "Carefully crafted components|{*}|Amazing page examples|{*}|Dynamic components",
    bulletIcons: "fas fa-fingerprint|{*}|fab fa-html5|{*}|far fa-paper-plane",
  });
  return growth
};
