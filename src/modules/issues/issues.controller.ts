import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from "@nestjs/common";
import { CreateIssueDto } from "./dto/create-issue.dto";
import { UpdateIssueDto } from "./dto/update-issue.dto";
import { IssuesService } from "./issues.service";
import { Public } from "src/common/decorators/public.decorator";

@Controller("issues")
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  create(@Body() createIssueDto: CreateIssueDto, @Request() req) {
    return this.issuesService.create(createIssueDto, req.user.id);
  }

  @Public()
  @Get(":organizationId")
  findAll(@Param("organizationId") organizationId: string) {
    return this.issuesService.findAll(+organizationId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.issuesService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateIssueDto: UpdateIssueDto) {
    return this.issuesService.update(+id, updateIssueDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.issuesService.remove(+id);
  }
}
