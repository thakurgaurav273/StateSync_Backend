import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { IssueLabelsModule } from './issue-labels/issue-labels.module';

@Module({
  controllers: [IssuesController],
  providers: [IssuesService],
  imports: [IssueLabelsModule],
})
export class IssuesModule {}
