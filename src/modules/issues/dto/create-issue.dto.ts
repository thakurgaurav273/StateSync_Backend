import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateIssueDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  createdById: number;

  @IsInt()
  organizationId: number;

  @IsOptional()
  @IsInt()
  projectId: number;

  @IsInt()
  teamId: number;

  @IsOptional()
  @IsInt()
  assignedToId: number;
}
