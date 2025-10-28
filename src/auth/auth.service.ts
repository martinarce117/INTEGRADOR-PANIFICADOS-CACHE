import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async registro(nombre: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usuariosService.crear(nombre, email, hashedPassword);
  }

  async login(email: string, password: string) {
    const usuario = await this.usuariosService.buscarPorEmail(email);
    if (!usuario) throw new UnauthorizedException('Usuario no encontrado');

    const valid = await bcrypt.compare(password, usuario.password);
    if (!valid) throw new UnauthorizedException('Contraseña incorrecta');

    const token = this.jwtService.sign({ id: usuario.id, email: usuario.email });
    return { token, usuario };
  }
}
