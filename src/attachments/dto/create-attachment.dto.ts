import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAttachmentDto {
  @IsNumber()
  issueId: number;

  @IsNumber()
  organizationId: number;

  @IsNumber()
  uploadedById: number;

  @IsString()
  fileName: string;

  @IsString()
  fileUrl: string;

  @IsString()
  fileType: string;

  @IsOptional()
  @IsString()
  storageKey: string;
}
