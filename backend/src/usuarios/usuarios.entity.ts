import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ unique: true, length: 150 })
  email!: string;

  @Column({ select: true })
  password!: string;

  // ✅ Campo para roles (por defecto: usuario)
  @Column({ default: 'usuario' })
  rol!: string;

  // ✅ Fecha de creación
  @CreateDateColumn({ type: 'timestamp' })
  creadoEn!: Date;

  // ✅ Fecha de actualización
  @UpdateDateColumn({ type: 'timestamp' })
  actualizadoEn!: Date;
}
