"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainLayout_1 = require("./MainLayout/mainLayout");
require("./Utils/db");
const Config_1 = require("./Config");
const app = (0, express_1.default)();
const PORT = Number(Config_1.MAIN_PORT) | 5000;
//*Main Function to start app
(0, mainLayout_1.mainLayout)(app);
app.listen(PORT, () => {
    console.log("Listening to port", PORT);
});
