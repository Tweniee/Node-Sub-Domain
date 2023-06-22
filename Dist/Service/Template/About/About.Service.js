"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTemplateAboutService = void 0;
const About_Model_1 = __importDefault(require("../../../Model/TemplateContent/About/About.Model"));
const Cards_Service_1 = require("../Cards/Cards.Service");
const Text_Service_1 = require("../Text/Text.Service");
const cardText = [
    {
        icon: "fas fa-medal",
        heading: "Excellent Services",
        subText: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
        icon: "fas fa-poll",
        heading: "Grow your market",
        subText: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
        icon: "fas fa-lightbulb",
        heading: "Launch time",
        subText: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
];
const createTemplateAboutService = () => __awaiter(void 0, void 0, void 0, function* () {
    const text = yield (0, Text_Service_1.createTemplateTextService)("Put the potentially record low maximum sea ice extent tihs year down to low ice. According to the National Oceanic and Atmospheric Administration, Ted, Scambos.", "Build something");
    const cards = yield (0, Cards_Service_1.createTemplateCardsService)(cardText);
    const about = yield About_Model_1.default.create({
        text: text._id,
        cards: cards
    });
    return about;
});
exports.createTemplateAboutService = createTemplateAboutService;
