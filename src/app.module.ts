import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth/auth.module";
import { IssuesModule } from "./modules/issues/issues.module";
import { OrganizationsModule } from "./modules/organizations/organizations.module";
import { ProjectsModule } from "./modules/projects/projects.module";
import { TeamsModule } from "./modules/teams/teams.module";
import { UsersModule } from "./modules/users/users.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    PrismaModule,
    UsersModule,
    AuthModule,
    IssuesModule,
    ProjectsModule,
    OrganizationsModule,
    TeamsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
