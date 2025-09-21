"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const MongoURI = process.env.MongoURI;
exports.default = async () => {
    try {
        await mongoose_1.default.connect(MongoURI);
        console.log('DB Connected...');
    }
    catch (error) {
        console.log('DB Error :', error);
    }
};
