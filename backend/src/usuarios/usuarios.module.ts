import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.entity';

@Module({
  imports: [
    /**
     * ✅ Registramos la entidad Usuario para que TypeORM
     * pueda inyectar su repositorio en los servicios que lo necesiten.
     */
    TypeOrmModule.forFeature([Usuario]),
  ],

  controllers: [
    /**
     * ✅ Controlador encargado de manejar las rutas de usuarios.
     */
    UsuariosController,
  ],

  providers: [
    /**
     * ✅ Servicio que contiene la lógica de negocio para usuarios.
     */
    UsuariosService,
  ],

  exports: [
    /**
     * ✅ Exportamos el servicio y el TypeOrmModule para que otros módulos
     * (por ejemplo AuthModule) puedan usar el repositorio de Usuario.
     */
    UsuariosService,
    TypeOrmModule,
  ],
})
export class UsuariosModule {}
