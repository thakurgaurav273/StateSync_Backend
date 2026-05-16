import { PartialType } from '@nestjs/mapped-types';
import { CreateIssueLabelDto } from './create-issue-label.dto';

export class UpdateIssueLabelDto extends PartialType(CreateIssueLabelDto) {}
