"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsControllers = exports.AuthControllers = void 0;
var auth_controllers_1 = require("./auth.controllers");
Object.defineProperty(exports, "AuthControllers", { enumerable: true, get: function () { return __importDefault(auth_controllers_1).default; } });
var posts_controllers_1 = require("./posts.controllers");
Object.defineProperty(exports, "PostsControllers", { enumerable: true, get: function () { return __importDefault(posts_controllers_1).default; } });
