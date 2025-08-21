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
exports.Inventario = void 0;
const typeorm_1 = require("typeorm");
const categorias_entity_1 = require("../categorias/categorias.entity");
const marcas_entity_1 = require("../marcas/marcas.entity");
let Inventario = class Inventario {
};
exports.Inventario = Inventario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Inventario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Inventario.prototype, "nombreProducto", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Inventario.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Inventario.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categorias_entity_1.Categoria, { nullable: false, eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'categoriaId' }),
    __metadata("design:type", categorias_entity_1.Categoria)
], Inventario.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Inventario.prototype, "categoriaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => marcas_entity_1.Marca, { nullable: false, eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'marcaId' }),
    __metadata("design:type", marcas_entity_1.Marca)
], Inventario.prototype, "marca", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Inventario.prototype, "marcaId", void 0);
exports.Inventario = Inventario = __decorate([
    (0, typeorm_1.Entity)('inventario')
], Inventario);
