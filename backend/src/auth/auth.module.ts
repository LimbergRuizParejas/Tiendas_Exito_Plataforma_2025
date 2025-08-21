import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // ✅ Passport para estrategias de autenticación
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // ✅ JWT configurado con secreto y expiración
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret_default',
      signOptions: { expiresIn: '2h' }, // Ajusta el tiempo de expiración
    }),

    // ✅ Importamos UsuariosModule que ahora exporta el repositorio y servicio
    UsuariosModule,
  ],
  controllers: [
    // ✅ Controlador para rutas de login y registro
    AuthController,
  ],
  providers: [
    // ✅ Servicio principal de autenticación
    AuthService,

    // ✅ Estrategia JWT que valida los tokens
    JwtStrategy,
  ],
  exports: [
    // ✅ Exportamos AuthService para que otros módulos puedan usar autenticación
    AuthService,
  ],
})
export class AuthModule {}
