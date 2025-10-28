import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from './productos/productos.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/usuario.entity';
import { Producto } from './productos/producto.entity';
import { UsuariosService } from './usuarios/usuarios.service';
import { UsuariosController } from './usuarios/usuarios.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'panificados',
      entities: [Usuario, Producto],
      synchronize: true, //para desarrollo
    }),
    ProductosModule,
    AuthModule,
    UsuariosModule,
  ],
  providers: [UsuariosService],
  controllers: [UsuariosController],
})
export class AppModule {}
