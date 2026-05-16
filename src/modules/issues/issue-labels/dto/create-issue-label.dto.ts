import { IsNumber } from "class-validator";

export class CreateIssueLabelDto {
  @IsNumber()
  issueId: number;

  @IsNumber()
  labelId: number;

  @IsNumber()
  addedById: number;
}
