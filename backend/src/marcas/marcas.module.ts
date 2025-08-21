import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcasController } from './marcas.controller';
import { MarcasService } from './marcas.service';
import { Marca } from './marcas.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Marca]), // Registrar el repositorio de `Marca`
  ],
  controllers: [MarcasController], // Controlador de marcas
  providers: [MarcasService], // Servicio de marcas
  exports: [
    TypeOrmModule, // Exportar para que otros módulos puedan usar `Marca`
    MarcasService, // Exportar el servicio si es necesario
  ],
})
export class MarcasModule {}
