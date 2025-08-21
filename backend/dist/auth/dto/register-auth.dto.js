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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterAuthDto = void 0;
const class_validator_1 = require("class-validator");
class RegisterAuthDto {
}
exports.RegisterAuthDto = RegisterAuthDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser un texto válido.' }),
    (0, class_validator_1.MinLength)(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
    __metadata("design:type", String)
], RegisterAuthDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Debe proporcionar un correo electrónico válido.' }),
    __metadata("design:type", String)
], RegisterAuthDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La contraseña debe ser un texto válido.' }),
    (0, class_validator_1.MinLength)(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
        message: 'La contraseña debe contener al menos una letra y un número.',
    }),
    __metadata("design:type", String)
], RegisterAuthDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El rol debe ser una cadena de texto.' }),
    __metadata("design:type", String)
], RegisterAuthDto.prototype, "rol", void 0);
