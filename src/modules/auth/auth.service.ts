import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAuthDto } from "./dto/create-auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}
  async login(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;
    try {
      const existingUserData = await this.prisma.user.findUnique({
        where: { email },
      });
      if (!existingUserData) {
        throw new HttpException("User doesn't exists please signup!", 401);
      }
      const isPasswordValid = bcrypt.compare(password, existingUserData.password);
      if (!isPasswordValid) {
        throw new HttpException("Invalid credentials", 401);
      }
      const { password: _, ...userWithoutPassword } = existingUserData;
      const payload = userWithoutPassword;
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
