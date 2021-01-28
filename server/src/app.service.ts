import { Injectable } from '@nestjs/common';
import { Person } from './models/person';

@Injectable()
export class AppService {

  getPersons(): Person[] {
    return [
      new Person({ id: 1, firstName: 'Donald', lastName: 'Duck', age: 30 }),
      new Person({ id: 2, firstName: 'Mickey', lastName: 'Mouse', age: 35 }),
      new Person({ id: 3, firstName: 'Foo', lastName: 'Bar', age: 15 })
    ];
  }
}
