import { TemplateTextModel } from "../../../Model/TemplateContent/Text/Text.model";

export const createTemplateTextService = async (subText = null, heading) => {
  if (subText) {
    var subTemplateText = await TemplateTextModel.create({
      text: subText,
    });
  }
  if (subText) {
    var templateText = await TemplateTextModel.create({
      subHeading: subTemplateText._id,
      text: heading,
    });
  } else {
    var templateText = await TemplateTextModel.create({
      text: heading,
    });
  }

  return templateText;
};
