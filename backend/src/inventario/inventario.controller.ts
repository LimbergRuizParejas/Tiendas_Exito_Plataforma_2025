import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CrearInventarioDto } from './crear-inventario.dto';
import { UpdateInventoryDto } from './update-inventory.dto';

@Controller('inventory') // Base path
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  // Obtener todos los productos del inventario
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.inventarioService.findAll();
  }

  // Obtener resumen (por ejemplo total valor, total productos)
  @Get('summary')
  @HttpCode(HttpStatus.OK)
  async getSummary() {
    return this.inventarioService.getSummary();
  }

  // Obtener agrupado por categoría y marca
  @Get('grouped')
  @HttpCode(HttpStatus.OK)
  async findGroupedByCategoryAndBrand() {
    return this.inventarioService.findGroupedByCategoryAndBrand();
  }

  // Crear nuevo producto en inventario
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createInventoryDto: CrearInventarioDto) {
    return this.inventarioService.create(createInventoryDto);
  }

  // Actualizar producto por ID
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventarioService.update(id, updateInventoryDto);
  }

  // Ruta rápida para actualizar solo el stock (cantidad)
  @Patch(':id/stock')
  @HttpCode(HttpStatus.OK)
  async updateStock(
    @Param('id', ParseIntPipe) id: number,
    @Body('cantidad') cantidad: number,
  ) {
    return this.inventarioService.updateStock(id, cantidad);
  }

  // Eliminar producto
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.inventarioService.delete(id);
  }
}
