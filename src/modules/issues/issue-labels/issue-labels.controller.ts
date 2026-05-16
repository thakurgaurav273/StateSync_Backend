import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { CreateIssueLabelDto } from "./dto/create-issue-label.dto";
import { IssueLabelsService } from "./issue-labels.service";

@Controller("issues")
export class IssueLabelsController {
  constructor(private readonly issueLabelsService: IssueLabelsService) {}

  @Post(":issueId/label")
  create(@Body() createIssueLabelDto: CreateIssueLabelDto) {
    return this.issueLabelsService.create(createIssueLabelDto);
  }

  @Delete(":issueId/label/:id")
  remove(@Param("id") id: string) {
    return this.issueLabelsService.remove(+id);
  }
}
