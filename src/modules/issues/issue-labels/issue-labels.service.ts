import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateIssueLabelDto } from "./dto/create-issue-label.dto";
import { UpdateIssueLabelDto } from "./dto/update-issue-label.dto";

@Injectable()
export class IssueLabelsService {
  constructor(private prismaService: PrismaService) {}
  async create(createIssueLabelDto: CreateIssueLabelDto) {
    try {
      const response = await this.prismaService.issueLabel.create({
        data: createIssueLabelDto,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return `This action returns all issueLabels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} issueLabel`;
  }

  update(id: number, updateIssueLabelDto: UpdateIssueLabelDto) {
    return `This action updates a #${id} issueLabel`;
  }

  async remove(id: number) {
    try {
      const exisitingLabel = await this.prismaService.issueLabel.findFirst({
        where: {
          id: id,
        },
      });
      if (exisitingLabel) {
        const response = await this.prismaService.issueLabel.deleteMany({
          where: {
            id: id,
          },
        });
        return response;
      } else {
        return new NotFoundException();
      }
    } catch (err) {
      throw err;
    }
  }
}
