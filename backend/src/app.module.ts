import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

// Módulos funcionales / de dominio
import { ProductosModule } from './productos/productos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { MarcasModule } from './marcas/marcas.module';
import { InventarioModule } from './inventario/inventario.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // ✅ Configuración global de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ TypeORM con configuración asincrónica
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<number>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        logging: configService.get<string>('NODE_ENV') !== 'production',
      }),
    }),

    // ✅ Módulos de negocio
    ProductosModule,
    CategoriasModule,
    MarcasModule,
    InventarioModule,
    ChatbotModule,
    UsuariosModule,
    AuthModule,

    // ✅ JWT global (opcional si ya lo tienes en AuthModule)
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret_default',
      signOptions: { expiresIn: '2h' },
    }),
  ],
})
export class AppModule {}
