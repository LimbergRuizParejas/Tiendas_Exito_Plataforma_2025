import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Marca } from './marcas.entity';

@Injectable()
export class MarcasService {
  constructor(
    @InjectRepository(Marca)
    private marcasRepository: Repository<Marca>,
  ) {}

  findAll(): Promise<Marca[]> {
    return this.marcasRepository.find();
  }

  async findOne(id: number): Promise<Marca> {
    const marca = await this.marcasRepository.findOne({ where: { id } });
    if (!marca) {
      throw new NotFoundException(`Marca con ID ${id} no encontrada`);
    }
    return marca;
  }

  create(marca: Marca): Promise<Marca> {
    return this.marcasRepository.save(marca);
  }

  async update(id: number, marca: Marca): Promise<Marca> {
    await this.marcasRepository.update(id, marca);
    const updatedMarca = await this.marcasRepository.findOne({ where: { id } });
    if (!updatedMarca) {
      throw new NotFoundException(`Marca con ID ${id} no encontrada tras la actualización`);
    }
    return updatedMarca;
  }

  async remove(id: number): Promise<void> {
    const result = await this.marcasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Marca con ID ${id} no encontrada para eliminar`);
    }
  }
}
