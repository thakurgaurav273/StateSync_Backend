import { Test, TestingModule } from '@nestjs/testing';
import { IssueLabelsController } from './issue-labels.controller';
import { IssueLabelsService } from './issue-labels.service';

describe('IssueLabelsController', () => {
  let controller: IssueLabelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IssueLabelsController],
      providers: [IssueLabelsService],
    }).compile();

    controller = module.get<IssueLabelsController>(IssueLabelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
