import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El nombre debe ser un texto.' })
  nombre!: string;
}
