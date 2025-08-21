import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventario } from './inventario.entity';
import { CrearInventarioDto } from './crear-inventario.dto';
import { UpdateInventoryDto } from './update-inventory.dto';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
  ) {}

  /**
   * Obtener todos los productos del inventario incluyendo sus relaciones
   * (categoría y marca).
   */
  async findAll(): Promise<Inventario[]> {
    try {
      return await this.inventarioRepository.find({
        relations: ['categoria', 'marca'],
      });
    } catch (error) {
      console.error('Error al obtener el inventario:', error);
      throw new InternalServerErrorException('No se pudo obtener el inventario.');
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
        totalProductos: parseInt(result?.totalProductos || '0'),
        totalValor: parseFloat(result?.totalValor || '0'),
      };
    } catch (error) {
      console.error('Error al obtener el resumen:', error);
      throw new InternalServerErrorException('No se pudo obtener el resumen del inventario.');
    }
  }

  /**
   * Crear un nuevo registro de producto en el inventario.
   */
  async create(createInventoryDto: CrearInventarioDto): Promise<Inventario> {
    try {
      const nuevoProducto = this.inventarioRepository.create(createInventoryDto);
      return await this.inventarioRepository.save(nuevoProducto);
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw new InternalServerErrorException('No se pudo crear el producto.');
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
    } catch (error) {
      console.error('Error al agrupar inventario:', error);
      throw new InternalServerErrorException('No se pudo agrupar el inventario.');
    }
  }

  /**
   * Actualizar completamente los datos de un producto del inventario.
   */
  async update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<Inventario> {
    const producto = await this.inventarioRepository.findOne({ where: { id } });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }

    try {
      Object.assign(producto, updateInventoryDto);
      return await this.inventarioRepository.save(producto);
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw new InternalServerErrorException('No se pudo actualizar el producto.');
    }
  }

  /**
   * Actualizar solo el stock (cantidad) de un producto.
   */
  async updateStock(id: number, cantidad: number): Promise<Inventario> {
    const producto = await this.inventarioRepository.findOne({ where: { id } });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }

    try {
      producto.cantidad = cantidad;
      return await this.inventarioRepository.save(producto);
    } catch (error) {
      console.error('Error al actualizar stock:', error);
      throw new InternalServerErrorException('No se pudo actualizar el stock.');
    }
  }

  /**
   * Eliminar un producto del inventario.
   */
  async delete(id: number): Promise<void> {
    try {
      const result = await this.inventarioRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw new InternalServerErrorException('No se pudo eliminar el producto.');
    }
  }
}
