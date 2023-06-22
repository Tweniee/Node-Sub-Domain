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
exports.createTemplateBannerService = void 0;
const Banner_Model_1 = require("../../../Model/TemplateContent/Banner/Banner.Model");
const Text_Service_1 = require("../Text/Text.Service");
const createTemplateBannerService = () => __awaiter(void 0, void 0, void 0, function* () {
    const text = yield (0, Text_Service_1.createTemplateTextService)("This is a simple example of a Landing Page you can build using Notus Angular. It features multiple CSS components based on the Tailwind CSS design system.", "Your story starts with us.");
    const banner = yield Banner_Model_1.TemplateBannerSectionModel.create({
        bg_Image: "bg_Banner.avif",
        text: text._id,
    });
    return banner;
});
exports.createTemplateBannerService = createTemplateBannerService;
