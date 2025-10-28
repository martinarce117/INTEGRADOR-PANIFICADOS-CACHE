import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  getUsuarios() {
    return this.usuariosService.findAll();
  }

  @Post()
  crearUsuario(@Body() body) {
    return this.usuariosService.create(body);
  }
}
