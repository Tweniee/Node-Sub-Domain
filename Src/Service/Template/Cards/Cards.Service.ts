import { TemplateCardSectionModel } from "../../../Model/TemplateContent/Cards/Cards.Model";
import { createTemplateTextService } from "../Text/Text.Service";

export const createTemplateCardsService = async (
  cardText: { subText: string; heading: string; icon: string }[]
) => {
  const cards = [];
  cardText.forEach(async (item) => {
    const text = await createTemplateTextService(item.subText, item.heading);
    const card = await TemplateCardSectionModel.create({
      icon: item.icon,
      text: text._id,
    });
    cards.push(card._id);
  });
  return cards;
};
