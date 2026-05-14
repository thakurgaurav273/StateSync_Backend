import { IsOptional, IsString } from "class-validator";

export class CreateOrganizationDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  avatar: string;
}
