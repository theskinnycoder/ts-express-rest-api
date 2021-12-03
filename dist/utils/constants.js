"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_PROD = exports.NODE_ENV = exports.DB_URI = exports.PORT = void 0;
const dotenv_safe_1 = require("dotenv-safe");
dotenv_safe_1.config();
exports.PORT = process.env.PORT;
exports.DB_URI = process.env.DB_URI;
exports.NODE_ENV = process.env.NODE_ENV;
exports.IS_PROD = exports.NODE_ENV === 'production';
