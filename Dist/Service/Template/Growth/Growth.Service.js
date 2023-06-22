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
exports.createTemplateGrowthService = void 0;
const Growth_Model_1 = require("../../../Model/TemplateContent/Growth/Growth.Model");
const Text_Service_1 = require("../Text/Text.Service");
const createTemplateGrowthService = () => __awaiter(void 0, void 0, void 0, function* () {
    const text = yield (0, Text_Service_1.createTemplateTextService)("The extension comes with three pre-built pages to help you get started faster. You can change the text and images and you're good to go.", "A growing company");
    const growth = yield Growth_Model_1.TemplateGrowthSectionModel.create({
        text: text._id,
        icon: "fas fa-rocket",
        cardImage: "desk.avif",
        bulletPoints: "Carefully crafted components|{*}|Amazing page examples|{*}|Dynamic components",
        bulletIcons: "fas fa-fingerprint|{*}|fab fa-html5|{*}|far fa-paper-plane",
    });
    return growth;
});
exports.createTemplateGrowthService = createTemplateGrowthService;
