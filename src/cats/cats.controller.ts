// a controller's responsibility is to handle incoming requests and send outgoing responses
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat';
import { Cat } from './interfaces/cat.interface';

@Controller('cats') // create a controller for the prefix `cats/`
export class CatsController {
  constructor(private catsService: CatsService) {}
  // through the constructor, the service is injected into this controller

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
}
