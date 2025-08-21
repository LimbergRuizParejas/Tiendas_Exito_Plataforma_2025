import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuarios.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const user = await this.usuarioRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<Usuario> {
    const user = this.usuarioRepository.create(dto);
    return await this.usuarioRepository.save(user);
  }

  async update(id: number, dto: UpdateUserDto): Promise<Usuario> {
    const user = await this.findOne(id);
    Object.assign(user, dto);
    return await this.usuarioRepository.save(user);
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);
    await this.usuarioRepository.remove(user);
    return { message: 'Usuario eliminado correctamente' };
  }
}
