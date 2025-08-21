import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { Categoria } from './categorias.entity';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id);
  }

  @Post()
  create(@Body() categoria: Categoria) {
    return this.categoriasService.create(categoria);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() categoria: Categoria) {
    return this.categoriasService.update(+id, categoria);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }
}
