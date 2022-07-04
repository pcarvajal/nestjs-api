import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task name',
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: 'Task description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Task expiration date',
  })
  @IsString()
  @IsOptional()
  expirationDate?: string;
}
