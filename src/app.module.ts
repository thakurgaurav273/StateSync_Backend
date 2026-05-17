import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthGuard } from "./common/guards/auth/auth.guard";
import { AuthModule } from "./modules/auth/auth.module";
import { IssuesModule } from "./modules/issues/issues.module";
import { OrganizationsModule } from "./modules/organizations/organizations.module";
import { ProjectsModule } from "./modules/projects/projects.module";
import { TeamsModule } from "./modules/teams/teams.module";
import { UsersModule } from "./modules/users/users.module";
import { PrismaModule } from "./prisma/prisma.module";
import { LabelsModule } from './submodules/labels/labels.module';
import { CommentsModule } from './submodules/comments/comments.module';
import { AttachmentsModule } from './submodules/attachments/attachments.module';
import { ActivitiesModule } from './submodules/activities/activities.module';

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
    JwtModule,
    LabelsModule,
    CommentsModule,
    AttachmentsModule,
    ActivitiesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
