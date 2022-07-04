import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  name: string;
  @IsString()
  description: string;
  @IsString()
  @IsOptional()
  expirationDate?: string;
}
