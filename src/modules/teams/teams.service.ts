import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTeamDto } from "./dto/create-team.dto";
import { UpdateTeamDto } from "./dto/update-team.dto";

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}
  async create(createTeamDto: CreateTeamDto) {
    try {
      const existingOrganization = await this.prisma.organization.findUnique({
        where: { id: createTeamDto.organizationId },
      });
      if (!existingOrganization) {
        throw new HttpException(
          "Organization not found, you must have an organization to create a team",
          404
        );
      }
      const team = await this.prisma.team.create({
        data: createTeamDto,
      });
      return team;
    } catch (error) {
      console.error("Error creating team:", error);
      throw error;
    }
  }

  async findAll() {
    try {
      const teams = await this.prisma.team.findMany();
      return teams;
    } catch (error) {
      console.error("Error finding all teams:", error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const team = await this.prisma.team.findUnique({
        where: { id },
      });
      if (!team) {
        throw new HttpException("Team not found", 404);
      }
      return team;
    } catch (error) {
      console.error("Error finding team:", error);
      throw error;
    }
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    try {
      const team = await this.prisma.team.update({
        where: { id },
        data: updateTeamDto,
      });
      return team;
    } catch (error) {
      console.error("Error updating team:", error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.team.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error removing team:", error);
      throw new HttpException("Team not found", 404);
    }
  }
}
