import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Producto } from '../productos/productos.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos!: Producto[];
}
