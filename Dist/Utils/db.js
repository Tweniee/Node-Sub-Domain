"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const index_1 = require("../Environment/index");
(0, mongoose_1.connect)(index_1.DB_URI)
    .then(() => console.log("Server side MongoDB connected"))
    .catch((error) => console.log(error));
