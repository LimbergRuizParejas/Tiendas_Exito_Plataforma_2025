"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuarios_controller_1 = require("./usuarios.controller");
const usuarios_service_1 = require("./usuarios.service");
const usuarios_entity_1 = require("./usuarios.entity");
let UsuariosModule = class UsuariosModule {
};
exports.UsuariosModule = UsuariosModule;
exports.UsuariosModule = UsuariosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            /**
             * ✅ Registramos la entidad Usuario para que TypeORM
             * pueda inyectar su repositorio en los servicios que lo necesiten.
             */
            typeorm_1.TypeOrmModule.forFeature([usuarios_entity_1.Usuario]),
        ],
        controllers: [
            /**
             * ✅ Controlador encargado de manejar las rutas de usuarios.
             */
            usuarios_controller_1.UsuariosController,
        ],
        providers: [
            /**
             * ✅ Servicio que contiene la lógica de negocio para usuarios.
             */
            usuarios_service_1.UsuariosService,
        ],
        exports: [
            /**
             * ✅ Exportamos el servicio y el TypeOrmModule para que otros módulos
             * (por ejemplo AuthModule) puedan usar el repositorio de Usuario.
             */
            usuarios_service_1.UsuariosService,
            typeorm_1.TypeOrmModule,
        ],
    })
], UsuariosModule);
