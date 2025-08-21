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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventarioController = void 0;
const common_1 = require("@nestjs/common");
const inventario_service_1 = require("./inventario.service");
const crear_inventario_dto_1 = require("./crear-inventario.dto");
const update_inventory_dto_1 = require("./update-inventory.dto");
let InventarioController = class InventarioController {
    constructor(inventarioService) {
        this.inventarioService = inventarioService;
    }
    // Obtener todos los productos del inventario
    async findAll() {
        return this.inventarioService.findAll();
    }
    // Obtener resumen (por ejemplo total valor, total productos)
    async getSummary() {
        return this.inventarioService.getSummary();
    }
    // Obtener agrupado por categoría y marca
    async findGroupedByCategoryAndBrand() {
        return this.inventarioService.findGroupedByCategoryAndBrand();
    }
    // Crear nuevo producto en inventario
    async create(createInventoryDto) {
        return this.inventarioService.create(createInventoryDto);
    }
    // Actualizar producto por ID
    async update(id, updateInventoryDto) {
        return this.inventarioService.update(id, updateInventoryDto);
    }
    // Ruta rápida para actualizar solo el stock (cantidad)
    async updateStock(id, cantidad) {
        return this.inventarioService.updateStock(id, cantidad);
    }
    // Eliminar producto
    async delete(id) {
        await this.inventarioService.delete(id);
    }
};
exports.InventarioController = InventarioController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InventarioController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('summary'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InventarioController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)('grouped'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InventarioController.prototype, "findGroupedByCategoryAndBrand", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_inventario_dto_1.CrearInventarioDto]),
    __metadata("design:returntype", Promise)
], InventarioController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_inventory_dto_1.UpdateInventoryDto]),
    __metadata("design:returntype", Promise)
], InventarioController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/stock'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('cantidad')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], InventarioController.prototype, "updateStock", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InventarioController.prototype, "delete", null);
exports.InventarioController = InventarioController = __decorate([
    (0, common_1.Controller)('inventory') // Base path
    ,
    __metadata("design:paramtypes", [inventario_service_1.InventarioService])
], InventarioController);
