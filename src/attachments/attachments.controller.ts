import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  ParseIntPipe,
  Delete,
  Get,
} from "@nestjs/common";

import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

import { AttachmentsService } from "./attachments.service";

@Controller("issues/:issueId/attachments")
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({}),
    })
  )
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Param("issueId", ParseIntPipe) issueId: number
  ) {
    const mockUserId = 1;

    return this.attachmentsService.uploadIssueAttachment(file, issueId, mockUserId);
  }

  @Get()
  findAll(@Param("issueId", ParseIntPipe) issueId: number) {
    return this.attachmentsService.getIssueAttachments(issueId);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.attachmentsService.removeAttachment(id);
  }
}
