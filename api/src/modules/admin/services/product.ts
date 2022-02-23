import { Injectable, NotFoundException } from "@nestjs/common";
import { IProduct } from "modules/database/interfaces/product";
import { Product } from "modules/database/models/product";
import { ProductRepository } from "../repositories/product";

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
  ) {}

  public async save(model: IProduct): Promise<Product> {
    if (model.id) return this.update(model);
    return this.create(model);
  }

  public async remove(productId: number): Promise<void> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('not-found');
    }

    return this.productRepository.remove(productId);
  }

  private async create(model: IProduct): Promise<Product> {
    const product = await this.productRepository.insert(model);
    return product;
  }

  private async update(model: IProduct): Promise<Product> {


    const product = await this.productRepository.findById(model.id);

    if (!product) throw new NotFoundException('not-found');

    return this.productRepository.update({ ...product, ...model });
  }
}
