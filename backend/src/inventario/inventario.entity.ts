import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Categoria } from '../categorias/categorias.entity';
import { Marca } from '../marcas/marcas.entity';

@Entity('inventario')
export class Inventario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombreProducto!: string;

  @Column('int')
  cantidad!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio!: number;

  // Relación con Categoría
  @ManyToOne(() => Categoria, { nullable: false, eager: true })
  @JoinColumn({ name: 'categoriaId' })
  categoria!: Categoria;

  @Column()
  categoriaId!: number;

  // Relación con Marca
  @ManyToOne(() => Marca, { nullable: false, eager: true })
  @JoinColumn({ name: 'marcaId' })
  marca!: Marca;

  @Column()
  marcaId!: number;
}
