import { ParseIntPipe } from "@nestjs/common";
import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { Delete, Get, Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Param, Query } from "@nestjs/common/decorators/http/route-params.decorator";
import { ApiResponse } from "@nestjs/swagger/dist/decorators/api-response.decorator";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { AuthRequired } from "modules/common/guards/token";
import { enRoles } from "modules/database/interfaces/user";
import { Product } from "modules/database/models/product";
import { ProductRepository } from "../repositories/product";
import { ProductService } from "../services/product";
import { ListValidator } from "../validators/product/list";
import { SaveValidator } from "../validators/product/save";

@ApiTags('Admin: Product')
@Controller('/product')
@AuthRequired([enRoles.admin])
export class ProductController {
  constructor(private productRepository: ProductRepository, private productService: ProductService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Product] })
  public async list(@Query() model: ListValidator) {
    return this.productRepository.list(model);
  }

  @Get(':productId')
  @ApiResponse({ status: 200, type: Product })
  public async details(@Param('productId', ParseIntPipe) productId: number) {
    return this.productRepository.findById(productId);
  }

  @Delete(':productId')
  public async delete(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.remove(productId);
  }

  @Post()
  @ApiResponse({ status: 200, type: Product })
  public async save(@Body() model: SaveValidator) {
    return this.productService.save(model);
  }
}
