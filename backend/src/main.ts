import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Tienda de Abarrotes')
    .setDescription('Documentación de la API para el catálogo de productos')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(3000);
  console.log('Servidor corriendo en http://localhost:3000');
  console.log('Documentación disponible en http://localhost:3000/api');
}
bootstrap();
