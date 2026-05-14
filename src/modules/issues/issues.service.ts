import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateIssueDto } from "./dto/create-issue.dto";
import { UpdateIssueDto } from "./dto/update-issue.dto";

@Injectable()
export class IssuesService {
  constructor(private prisma: PrismaService) {}
  async create(createIssueDto: CreateIssueDto, userId: number) {
    const issue = await this.prisma.$transaction(async (tx) => {
      const updatedTeam = await tx.team.update({
        where: { id: createIssueDto.teamId },
        data: {
          issueCounter: {
            increment: 1,
          },
        },
      });

      const issueKey = `${updatedTeam.code}-${updatedTeam.issueCounter}`;

      const data: any = {
        title: createIssueDto.title,
        description: createIssueDto.description,
        issueId: issueKey,

        createdBy: {
          connect: {
            id: userId,
          },
        },

        team: {
          connect: {
            id: createIssueDto.teamId,
          },
        },

        organization: {
          connect: {
            id: createIssueDto.organizationId,
          },
        },
      };

      if (createIssueDto.projectId) {
        data.project = {
          connect: {
            id: createIssueDto.projectId,
          },
        };
      }

      return tx.issue.create({
        data,
      });
    });
    return issue;
  }

  async findAll() {
    try {
      const issues = await this.prisma.issue.findMany();
      return issues;
    } catch (error) {
      console.error("Error finding all issues:", error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const issue = await this.prisma.issue.findUnique({
        where: { issueId: id },
      });
      if (!issue) {
        throw new Error("Issue not found");
      }
      return issue;
    } catch (error) {
      console.error("Error finding issue:", error);
      throw error;
    }
  }

  async update(id: number, updateIssueDto: UpdateIssueDto) {
    try {
      const issue = await this.prisma.issue.findUnique({
        where: { id },
      });
      if (!issue) {
        throw new Error("Issue not found");
      }
      await this.prisma.issue.update({
        where: { id },
        data: updateIssueDto,
      });
      return issue;
    } catch (error) {
      console.error("Error updating issue:", error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const issue = await this.prisma.issue.findUnique({
        where: { id },
      });
      if (!issue) {
        throw new Error("Issue not found");
      }
      return issue;
    } catch (error) {
      console.error("Error removing issue:", error);
      throw error;
    }
  }
}
