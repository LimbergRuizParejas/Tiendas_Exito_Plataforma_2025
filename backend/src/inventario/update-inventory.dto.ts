import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateInventoryDto {
  @IsOptional()
  @IsString()
  nombreProducto?: string;

  @IsOptional()
  @IsNumber()
  cantidad?: number;

  @IsOptional()
  @IsNumber()
  precio?: number;

  @IsOptional()
  @IsNumber()
  categoriaId?: number;

  @IsOptional()
  @IsNumber()
  marcaId?: number;
}
