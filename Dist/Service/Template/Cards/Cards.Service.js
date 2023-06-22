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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTemplateCardsService = void 0;
const Cards_Model_1 = require("../../../Model/TemplateContent/Cards/Cards.Model");
const Text_Service_1 = require("../Text/Text.Service");
const createTemplateCardsService = (cardText) => __awaiter(void 0, void 0, void 0, function* () {
    const cards = [];
    cardText.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
        const text = yield (0, Text_Service_1.createTemplateTextService)(item.subText, item.heading);
        const card = yield Cards_Model_1.TemplateCardSectionModel.create({
            icon: item.icon,
            text: text._id,
        });
        cards.push(card._id);
    }));
    return cards;
});
exports.createTemplateCardsService = createTemplateCardsService;
