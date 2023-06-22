import { TemplateExperienceSectionModel } from "../../../Model/TemplateContent/Experience/Experience.Model";
import { createTemplateTextService } from "../Text/Text.Service";

export const createTemplateExpService = async () => {
  const text = await createTemplateTextService(
    `Don't let your uses guess by attaching tooltips and popoves to any element. Just make sure you enable them first via JavaScript.

    The kit comes with three pre-built pages to help you get started faster. You can change the text and images and you're good to go. Just make sure you enable them first via JavaScript.`,
    "Working with us is a pleasure"
  );
  const imageText = await createTemplateTextService(
    "The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that process will continue whatever happens.",
    "Top Notch Services"
  );
  const experience = await TemplateExperienceSectionModel.create({
    icon: "fas fa-user-friends",
    text: text._id,
    bg_Color: "bg-red-600",
    imageText: imageText._id,
    cardImage: "TeamImage.avif",
  });
  return experience;
};
