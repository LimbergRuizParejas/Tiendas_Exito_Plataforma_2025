import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './categorias.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,
  ) {}

  findAll(): Promise<Categoria[]> {
    return this.categoriasRepository.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findOne({ where: { id } });
    if (!categoria) {
      throw new NotFoundException(`Categoria con ID ${id} no encontrada`);
    }
    return categoria;
  }

  create(categoria: Categoria): Promise<Categoria> {
    return this.categoriasRepository.save(categoria);
  }

  async update(id: number, categoria: Categoria): Promise<Categoria> {
    await this.categoriasRepository.update(id, categoria);
    const updatedCategoria = await this.categoriasRepository.findOne({ where: { id } });
    if (!updatedCategoria) {
      throw new NotFoundException(`Categoria con ID ${id} no encontrada tras la actualización`);
    }
    return updatedCategoria;
  }

  async remove(id: number): Promise<void> {
    const result = await this.categoriasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Categoria con ID ${id} no encontrada para eliminar`);
    }
  }
}
