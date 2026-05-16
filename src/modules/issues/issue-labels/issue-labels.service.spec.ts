import { Test, TestingModule } from '@nestjs/testing';
import { IssueLabelsService } from './issue-labels.service';

describe('IssueLabelsService', () => {
  let service: IssueLabelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IssueLabelsService],
    }).compile();

    service = module.get<IssueLabelsService>(IssueLabelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
