// a controller's responsibility is to handle incoming requests and send outgoing responses
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto, createCatSchema } from './dto/create-cat';
import { Cat } from './interfaces/cat.interface';
import { ZodValidationPipe } from 'src/shared/validation.pipe';

@Controller('cats') // create a controller for the prefix `cats/`
export class CatsController {
  constructor(private catsService: CatsService) {}
  // through the constructor, the service is injected into this controller

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.catsService.findOne(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createCatSchema))
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
}
