"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainLayout = void 0;
const Index_1 = require("../Routes/Index");
const mainLayout = (app) => {
    app.use("/userLogin", Index_1.loginRoute);
};
exports.mainLayout = mainLayout;
