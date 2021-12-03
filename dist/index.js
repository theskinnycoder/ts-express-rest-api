"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importStar(require("express"));
const morgan_1 = __importDefault(require("morgan"));
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const controllers_1 = require("./controllers");
const utils_1 = require("./utils");
utils_1.connectDB()
    .then(() => {
    const app = express_1.default();
    app.use(morgan_1.default('dev'));
    app.use(cors_1.default({ credentials: true, origin: ['http://localhost:3000'] }));
    app.use(cookie_parser_1.default());
    app.use(express_1.json());
    app.use(express_1.urlencoded({ extended: false }));
    routing_controllers_1.useExpressServer(app, {
        development: !utils_1.IS_PROD,
        routePrefix: '/api',
        controllers: [controllers_1.PostsControllers, controllers_1.AuthControllers],
        cors: true,
    }).listen(utils_1.PORT, () => {
        if (!utils_1.IS_PROD) {
            console.log(`Server up & running in ${utils_1.NODE_ENV.bgGreen.black} mode & is listening for requests at ${'http://localhost:${PORT}/api'.rainbow.underline}`);
        }
    });
})
    .catch((error) => {
    switch (error.name) {
        case 'unhandledRejection':
            console.log('👋UNHANDLED REJECTION! 💥Shutting down gracefully'.red.bold);
            break;
        case 'SIGTERM':
            console.log('👋SIGTERM RECEIVED! 💥Shutting down gracefully'.red.bold);
            break;
        default:
            console.log(`${error.name} : ${error.message}`.bgRed.white.bold);
    }
    process.exit(1);
});
