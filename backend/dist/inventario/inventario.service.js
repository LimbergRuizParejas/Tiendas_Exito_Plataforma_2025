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
exports.InventarioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inventario_entity_1 = require("./inventario.entity");
let InventarioService = class InventarioService {
    constructor(inventarioRepository) {
        this.inventarioRepository = inventarioRepository;
    }
    /**
     * Obtener todos los productos del inventario incluyendo sus relaciones
     * (categoría y marca).
     */
    async findAll() {
        try {
            return await this.inventarioRepository.find({
                relations: ['categoria', 'marca'],
            });
        }
        catch (error) {
            console.error('Error al obtener el inventario:', error);
            throw new common_1.InternalServerErrorException('No se pudo obtener el inventario.');
        }
    }
    /**
     * Obtener un resumen global del inventario:
     * total de productos y valor acumulado.
     */
    async getSummary() {
        try {
            const result = await this.inventarioRepository
                .createQueryBuilder('inventario')
                .select('SUM(inventario.cantidad)', 'totalProductos')
                .addSelect('SUM(inventario.cantidad * inventario.precio)', 'totalValor')
                .getRawOne();
            return {
                totalProductos: parseInt((result === null || result === void 0 ? void 0 : result.totalProductos) || '0'),
                totalValor: parseFloat((result === null || result === void 0 ? void 0 : result.totalValor) || '0'),
            };
        }
        catch (error) {
            console.error('Error al obtener el resumen:', error);
            throw new common_1.InternalServerErrorException('No se pudo obtener el resumen del inventario.');
        }
    }
    /**
     * Crear un nuevo registro de producto en el inventario.
     */
    async create(createInventoryDto) {
        try {
            const nuevoProducto = this.inventarioRepository.create(createInventoryDto);
            return await this.inventarioRepository.save(nuevoProducto);
        }
        catch (error) {
            console.error('Error al crear producto:', error);
            throw new common_1.InternalServerErrorException('No se pudo crear el producto.');
        }
    }
    /**
     * Obtener inventario agrupado por categoría y marca con cantidad y valor total.
     */
    async findGroupedByCategoryAndBrand() {
        try {
            return await this.inventarioRepository
                .createQueryBuilder('inventario')
                .innerJoinAndSelect('inventario.categoria', 'categoria')
                .innerJoinAndSelect('inventario.marca', 'marca')
                .select([
                'categoria.nombre AS categoria',
                'marca.nombre AS marca',
                'SUM(inventario.cantidad) AS totalCantidad',
                'SUM(inventario.cantidad * inventario.precio) AS totalValor',
            ])
                .groupBy('categoria.nombre')
                .addGroupBy('marca.nombre')
                .getRawMany();
        }
        catch (error) {
            console.error('Error al agrupar inventario:', error);
            throw new common_1.InternalServerErrorException('No se pudo agrupar el inventario.');
        }
    }
    /**
     * Actualizar completamente los datos de un producto del inventario.
     */
    async update(id, updateInventoryDto) {
        const producto = await this.inventarioRepository.findOne({ where: { id } });
        if (!producto) {
            throw new common_1.NotFoundException(`Producto con ID ${id} no encontrado.`);
        }
        try {
            Object.assign(producto, updateInventoryDto);
            return await this.inventarioRepository.save(producto);
        }
        catch (error) {
            console.error('Error al actualizar producto:', error);
            throw new common_1.InternalServerErrorException('No se pudo actualizar el producto.');
        }
    }
    /**
     * Actualizar solo el stock (cantidad) de un producto.
     */
    async updateStock(id, cantidad) {
        const producto = await this.inventarioRepository.findOne({ where: { id } });
        if (!producto) {
            throw new common_1.NotFoundException(`Producto con ID ${id} no encontrado.`);
        }
        try {
            producto.cantidad = cantidad;
            return await this.inventarioRepository.save(producto);
        }
        catch (error) {
            console.error('Error al actualizar stock:', error);
            throw new common_1.InternalServerErrorException('No se pudo actualizar el stock.');
        }
    }
    /**
     * Eliminar un producto del inventario.
     */
    async delete(id) {
        try {
            const result = await this.inventarioRepository.delete(id);
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Producto con ID ${id} no encontrado.`);
            }
        }
        catch (error) {
            console.error('Error al eliminar producto:', error);
            throw new common_1.InternalServerErrorException('No se pudo eliminar el producto.');
        }
    }
};
exports.InventarioService = InventarioService;
exports.InventarioService = InventarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inventario_entity_1.Inventario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InventarioService);
