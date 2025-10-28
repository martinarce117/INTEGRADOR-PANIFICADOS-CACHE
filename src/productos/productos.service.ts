import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productosRepo: Repository<Producto>,
  ) {}

  findAll() {
    return this.productosRepo.find();
  }

  create(data: Partial<Producto>) {
    const producto = this.productosRepo.create(data);
    return this.productosRepo.save(producto);
  }
}
