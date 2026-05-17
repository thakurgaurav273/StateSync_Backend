import { IsNumber, IsObject, IsString } from "class-validator";

export class CreateActivityDto {
  @IsNumber()
  issueId: number;

  @IsNumber()
  userId: number;

  @IsString()
  action: string;

  @IsObject()
  metadata: Record<string, any>;
}
