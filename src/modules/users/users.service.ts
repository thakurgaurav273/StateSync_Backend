import { HttpException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    try {
      if (existingUser) {
        throw new HttpException("User with this email already exists", 409);
      }
      const hash = await bcrypt.hash(password, saltOrRounds);
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hash,
        },
      });
      return {
        ...user,
        password: undefined,
      };
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      return {
        ...user,
        password: undefined,
      };
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return {
      ...user,
      password: undefined,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
