import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateLabelDto } from "./dto/create-label.dto";
import { UpdateLabelDto } from "./dto/update-label.dto";

@Injectable()
export class LabelsService {
  constructor(private prisma: PrismaService) {}
  async create(createLabelDto: CreateLabelDto) {
    try {
      const createdLabel = await this.prisma.label.create({
        data: createLabelDto,
      });

      if (createdLabel) {
        return createdLabel;
      }
    } catch (err) {
      return new HttpException("Something went wrong", 500);
    }
  }

  async findAll() {
    try {
      const results = await this.prisma.label.findMany();
      if (results) {
        return results;
      }
    } catch (err) {
      return new HttpException(err.message, 400);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} label`;
  }

  update(id: number, updateLabelDto: UpdateLabelDto) {
    return `This action updates a #${id} label`;
  }

  remove(id: number) {
    return `This action removes a #${id} label`;
  }
}
