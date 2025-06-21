// a controller's responsibility is to handle incoming requests and send outgoing responses
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('cats') // create a controller for the prefix `cats/`
export class CatsController {
  @Get() // create a handler for the endpoint `GET cats/`
  findAll(@Query() query: any): string {
    // @Query is a decorator for injecting the query object
    // you can access queries here
    console.log(query);
    // TODO: how to validate?
    return 'This action returns all cats';
  }

  @Get(':id') // create a handler for the endpoint `GET cats/:id`
  findOne(@Param() params: any): string {
    // @Param is a decorator for injecting the parameter object
    // you can access parameters here
    console.log(params);
    // TODO: how to validate?
    return 'This action returns a specific cat';
  }

  @Post() // create a handler for the endpoint `POST /cats`
  create(@Body() body: any) {
    // @Body is a decorator for injecting the body object
    // you can access body here
    console.log(body);
    // TODO: how to validate?
    return 'This action adds a new cat';
  }
}
