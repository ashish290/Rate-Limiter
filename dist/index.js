"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Express_1 = __importDefault(require("./service/Express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const rateLimiter_1 = require("./middleware/rateLimiter");
dotenv_1.default.config();
try {
    const StartServer = async () => {
        const app = (0, express_1.default)();
        const PORT = process.env.PORT;
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use((0, cookie_parser_1.default)());
        app.use(rateLimiter_1.rateLimiter);
        await (0, Express_1.default)(app);
        app.listen(PORT, () => {
            console.log(`Server is running on : ${PORT}`);
        });
    };
    StartServer();
}
catch (error) {
    console.log("Server Error :", error);
}
