import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "src/common/guards/auth/auth.guard";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [JwtModule],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard],
})
export class UsersModule {}
