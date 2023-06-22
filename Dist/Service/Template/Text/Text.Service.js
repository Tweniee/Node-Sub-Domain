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
exports.createTemplateTextService = void 0;
const Text_model_1 = require("../../../Model/TemplateContent/Text/Text.model");
const createTemplateTextService = (subText = null, heading) => __awaiter(void 0, void 0, void 0, function* () {
    if (subText) {
        var subTemplateText = yield Text_model_1.TemplateTextModel.create({
            text: subText,
        });
    }
    if (subText) {
        var templateText = yield Text_model_1.TemplateTextModel.create({
            subHeading: subTemplateText._id,
            text: heading,
        });
    }
    else {
        var templateText = yield Text_model_1.TemplateTextModel.create({
            text: heading,
        });
    }
    return templateText;
});
exports.createTemplateTextService = createTemplateTextService;
