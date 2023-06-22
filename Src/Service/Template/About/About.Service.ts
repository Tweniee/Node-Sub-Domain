import TemplateAboutSectionModel from "../../../Model/TemplateContent/About/About.Model";
import { createTemplateCardsService } from "../Cards/Cards.Service";
import { createTemplateTextService } from "../Text/Text.Service";
const cardText = [
  {
    icon: "fas fa-medal",
    heading: "Excellent Services",
    subText:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    icon: "fas fa-poll",
    heading: "Grow your market",
    subText:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    icon: "fas fa-lightbulb",
    heading: "Launch time",
    subText:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
];
export const createTemplateAboutService = async () => {
  const text = await createTemplateTextService(
    "Put the potentially record low maximum sea ice extent tihs year down to low ice. According to the National Oceanic and Atmospheric Administration, Ted, Scambos.",
    "Build something"
  );
  const cards = await createTemplateCardsService(cardText);
  const about = await TemplateAboutSectionModel.create({
    text: text._id,
    cards:cards
  });
  return about
};
