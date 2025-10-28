import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
  [x: string]: any;
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  //  Crear usuario
  async crear(nombre: string, email: string, password: string): Promise<Usuario> {
    const nuevoUsuario = this.usuariosRepository.create({ nombre, email, password });
    return this.usuariosRepository.save(nuevoUsuario);
  }

  //  Buscar usuario por email
  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { email } });
  }

  // Listar todos
  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }
}
