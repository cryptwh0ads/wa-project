import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { Model } from "objection";
import { IProduct } from "../interfaces/product";

export class Product extends Model implements IProduct {
    @ApiProperty({ type: 'integer' })
    public id: number;
    @ApiProperty({ type: 'string' })
    public description: string;
    @ApiProperty({ type: 'string' })
    public price: string;
    @ApiProperty({ type: 'integer' })
    public amount: number;

    @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public static get tableName(): string {
    return 'Product';
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }
}