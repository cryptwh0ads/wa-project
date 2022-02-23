import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import {Transaction, Page} from "objection"
import { IPaginationParams } from "modules/common/interfaces/pagination";
import { Product } from "modules/database/models/product";
import { IProduct } from "modules/database/interfaces/product";

@Injectable()
export class ProductRepository {
  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<Product>> {
    let query = Product.query(transaction)
      .select('*')
      .page(params.page, params.pageSize);

    if (params.orderBy) {
      if (params.orderBy !== 'price') {
        query = query.orderBy(params.orderBy, params.orderDirection);
      } else {
        query = query.orderBy('description', params.orderDirection).orderBy('amount', params.orderDirection);
      }
    }

    if (params.term) {
      query = query.where(query => {
        return query
          .where('description', 'ilike', `%${params.term}%`)
      });
    }

    return query;
  }

  public async count(transaction?: Transaction): Promise<Number> {
    const result: any = await Product.query(transaction)
      .count('id as count')
      .first();

    return Number(result.count);
  }

  public async findById(id: number, transaction?: Transaction): Promise<Product> {
    return Product.query(transaction)
      .where({ id })
      .first();
  }

  public async findByDescription(description: string, transaction?: Transaction): Promise<Product> {
    return Product.query(transaction)
      .where({ description })
      .first();
  }

  public async insert(model: IProduct, transaction?: Transaction): Promise<Product> {
      console.log(model)
    return Product.query(transaction).insert(model);
  }

  public async update(model: IProduct, transaction?: Transaction): Promise<Product> {
    return Product.query(transaction).updateAndFetchById(model.id, <Product>model);
  }

  public async remove(id: number, transaction?: Transaction): Promise<void> {
    await Product.query(transaction)
      .del()
      .where({ id });
  }
}
