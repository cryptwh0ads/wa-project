import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import { IProduct } from 'modules/database/interfaces/product';
import { enRoles, listPublicRoles } from 'modules/database/interfaces/user';

export class SaveValidator implements IProduct {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 50 })
  public description: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ required: false, type: 'string', minLength: 3 ,maxLength: 50 })
  public price: string;

  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty({ required: true, type: 'integer', maxLength: 12 })
  public amount: number;
}
