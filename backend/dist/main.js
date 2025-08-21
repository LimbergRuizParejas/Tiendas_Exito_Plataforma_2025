"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Configuración de Swagger
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API de Tienda de Abarrotes')
        .setDescription('Documentación de la API para el catálogo de productos')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors();
    await app.listen(3000);
    console.log('Servidor corriendo en http://localhost:3000');
    console.log('Documentación disponible en http://localhost:3000/api');
}
bootstrap();
