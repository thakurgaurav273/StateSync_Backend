import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { IssueStatus, Priority } from "@prisma/client";

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

  @IsOptional()
  @IsEnum(IssueStatus)
  status?: IssueStatus;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;
}
