export class CrearInventarioDto {
    nombreProducto!: string;
    cantidad!: number;
    precio!: number;
    categoriaId?: number; // ID de la categoría
    marcaId?: number; // ID de la marca
  }
  