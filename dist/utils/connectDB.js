"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
const constants_1 = require("./constants");
function connectDB() {
    return typeorm_1.createConnection({
        type: 'postgres',
        url: constants_1.DB_URI,
        logging: !constants_1.IS_PROD,
        synchronize: !constants_1.IS_PROD,
        entities: [entities_1.Post, entities_1.User],
    })
        .then((conn) => {
        if (!constants_1.IS_PROD) {
            console.log(`\nConnected to the ${conn.name} PostgreSQL DataBase...`.america.bold);
        }
    })
        .catch((error) => {
        console.log(error.message.red);
        process.exit(1);
    });
}
exports.default = connectDB;
