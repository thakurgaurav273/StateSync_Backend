import { IsNumber, IsString } from "class-validator";

export class CreateLabelDto {
  @IsString()
  title: string;

  @IsString()
  color: string;
  @IsNumber()
  organizationId: number;

  @IsNumber()
  createdById: number;
}
