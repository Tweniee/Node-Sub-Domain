"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainLayout_1 = require("./mainLayout/mainLayout");
require("./Utils/db");
const app = (0, express_1.default)();
const PORT = 5000;
//Main Function to start app
(0, mainLayout_1.mainLayout)(app);
app.listen(PORT, () => {
    console.log("Listening to port", PORT);
});
