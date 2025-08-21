// backend/src/marcas/marcas.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { Marca } from './marcas.entity';

@Controller('marcas')
export class MarcasController {
  constructor(private readonly marcasService: MarcasService) {}

  @Get()
  findAll() {
    return this.marcasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marcasService.findOne(+id);
  }

  @Post()
  create(@Body() marca: Marca) {
    return this.marcasService.create(marca);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() marca: Marca) {
    return this.marcasService.update(+id, marca);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marcasService.remove(+id);
  }
}
