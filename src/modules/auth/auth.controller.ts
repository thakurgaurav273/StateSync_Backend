import { Body, Controller, Delete, Get, Param, Post, Res, Req } from "@nestjs/common";
import { Public } from "src/common/decorators/public.decorator";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import type { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  login(@Body() createAuthDto: CreateAuthDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(createAuthDto, res);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get("me")
  getProfile(@Req() req: any) {
    return req.user;
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.authService.findOne(+id);
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("accessToken");

    return {
      success: true,
    };
  }
  @Delete("logout")
  remove(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("accessToken");

    return {
      success: true,
    };
  }
}
