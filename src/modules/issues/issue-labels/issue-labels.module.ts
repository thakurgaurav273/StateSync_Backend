import { Module } from '@nestjs/common';
import { IssueLabelsService } from './issue-labels.service';
import { IssueLabelsController } from './issue-labels.controller';

@Module({
  controllers: [IssueLabelsController],
  providers: [IssueLabelsService],
})
export class IssueLabelsModule {}
