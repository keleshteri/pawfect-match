import { PartialType } from '@nestjs/swagger';
import { CreatePuppyDto } from './create-puppy.dto';

export class UpdatePuppyDto extends PartialType(CreatePuppyDto) {}
