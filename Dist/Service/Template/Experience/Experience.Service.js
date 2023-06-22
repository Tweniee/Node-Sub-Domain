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
exports.createTemplateExpService = void 0;
const Experience_Model_1 = require("../../../Model/TemplateContent/Experience/Experience.Model");
const Text_Service_1 = require("../Text/Text.Service");
const createTemplateExpService = () => __awaiter(void 0, void 0, void 0, function* () {
    const text = yield (0, Text_Service_1.createTemplateTextService)(`Don't let your uses guess by attaching tooltips and popoves to any element. Just make sure you enable them first via JavaScript.

    The kit comes with three pre-built pages to help you get started faster. You can change the text and images and you're good to go. Just make sure you enable them first via JavaScript.`, "Working with us is a pleasure");
    const imageText = yield (0, Text_Service_1.createTemplateTextService)("The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that process will continue whatever happens.", "Top Notch Services");
    const experience = yield Experience_Model_1.TemplateExperienceSectionModel.create({
        icon: "fas fa-user-friends",
        text: text._id,
        bg_Color: "bg-red-600",
        imageText: imageText._id,
        cardImage: "TeamImage.avif",
    });
    return experience;
});
exports.createTemplateExpService = createTemplateExpService;
