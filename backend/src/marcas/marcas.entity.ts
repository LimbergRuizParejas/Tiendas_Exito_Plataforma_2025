import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Producto } from '../productos/productos.entity';

@Entity()
export class Marca {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  imagen!: string; // URL de la imagen de la marca

  @OneToMany(() => Producto, (producto) => producto.marca)
  productos!: Producto[];
}
