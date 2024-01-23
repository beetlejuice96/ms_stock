import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsInt,
  IsDate,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class UserBodyDto {
  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly name?: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly lastname?: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly nickname!: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly email?: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly password?: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly avatar?: string;

  @AutoMap()
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly msisdn?: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  readonly isSva?: boolean;

  @AutoMap()
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  readonly lastLogin?: Date;

  @AutoMap()
  @ApiProperty()
  @IsInt()
  @IsOptional()
  readonly totalLogin?: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  readonly svaPropertiesId?: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  readonly isPremium?: boolean;

  @AutoMap()
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  readonly graceEndsAt?: Date;

  @AutoMap()
  @ApiProperty()
  @IsInt()
  @IsOptional()
  readonly statusId?: number;

  @AutoMap()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  readonly forceResetPassword?: boolean;

  @AutoMap()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  readonly mailStatus?: boolean;

  @AutoMap()
  @ApiProperty()
  @IsInt()
  @IsOptional()
  readonly paymentMethodId?: number;

  @AutoMap()
  @ApiProperty()
  @IsInt()
  @IsOptional()
  readonly regionId?: number;

  @AutoMap()
  @ApiProperty()
  @IsInt()
  @IsOptional()
  readonly countryId?: number;

  @AutoMap()
  @ApiProperty()
  @IsInt()
  @IsOptional()
  readonly sponsorId?: number;

  constructor(params: UserBodyDto) {
    Object.assign(this, params);
  }
}
