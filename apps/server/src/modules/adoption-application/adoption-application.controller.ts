import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AdoptionApplicationService } from './adoption-application.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdoptionApplicationCreateDto } from './dtos/adoption-application-create.dto';
import { AdoptionApplicationCreateWithUserDto } from './dtos/adoption-application-create-user.dto';

/**
 * Controller for managing adoption applications.
 */
@ApiTags('adoption-applications')
@Controller('adoption-applications')
export class AdoptionApplicationController {
  constructor(
    private readonly applicationService: AdoptionApplicationService,
  ) {}

  /**
   *
   * @param applicationDto
   * @returns
   */
  @Post()
  @ApiOperation({ summary: 'Submit an adoption application' })
  @ApiResponse({
    status: 201,
    description: 'The application has been successfully submitted.',
  })
  async submitApplication(
    @Body() applicationDto: AdoptionApplicationCreateWithUserDto,
  ) {
    return this.applicationService.handleApplication(applicationDto);
  }
  // @Post()
  // @ApiOperation({ summary: 'Create an adoption application' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'The record has been successfully created.',
  // })
  // create(@Body() createApplicationDto: AdoptionApplicationCreateDto) {
  //   return this.applicationService.create(createApplicationDto);
  // }

  @Get()
  @ApiOperation({ summary: 'Get all adoption applications' })
  @ApiResponse({
    status: 200,
    description: 'Return all adoption applications.',
  })
  findAll() {
    return this.applicationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an adoption application by ID' })
  @ApiResponse({ status: 200, description: 'Return one adoption application.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.applicationService.findOne(id);
  }
}
