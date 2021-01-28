import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Person } from './models/person';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('persons')
  getPersons(): Person[] {
    return this.appService.getPersons();
  }
}
