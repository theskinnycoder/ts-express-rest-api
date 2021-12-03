"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = require("argon2");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Base_entity_1 = __importDefault(require("./Base.entity"));
var Roles;
(function (Roles) {
    Roles["ADMIN"] = "ADMIN";
    Roles["USER"] = "USER";
})(Roles || (Roles = {}));
let User = class User extends Base_entity_1.default {
    hashPassword(rawPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            this.password = yield argon2_1.hash(rawPassword);
        });
    }
    checkPassword(enteredPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return argon2_1.verify(this.password, enteredPassword);
        });
    }
};
__decorate([
    typeorm_1.Index(),
    class_validator_1.Length(6, 20, { message: 'Handle must be 6-20 characters long' }),
    class_validator_1.IsNotEmpty({ message: 'Handle must not be empty' }),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "handle", void 0);
__decorate([
    typeorm_1.Index(),
    class_validator_1.IsEmail(undefined, { message: 'Must be a valid email address' }),
    class_validator_1.IsNotEmpty({ message: 'Email address must not be empty' }),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    class_validator_1.Length(8, 255, { message: 'Password must be atleast 8 characters long' }),
    class_validator_1.IsNotEmpty({ message: 'Password must not be empty' }),
    class_transformer_1.Exclude(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    class_validator_1.IsEnum(Roles),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
User = __decorate([
    typeorm_1.Entity('user')
], User);
exports.default = User;
