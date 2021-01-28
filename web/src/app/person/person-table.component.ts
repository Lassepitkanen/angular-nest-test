import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/person';
import { PersonService } from './person.service';

@Component({
  selector: 'person-table',
  templateUrl: './person-table.component.html',
  styles: [
    '.table-wrapper { height: 400px; overflow: auto; }',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonTableComponent {
  filteredPersons$: Observable<Person[]> = this.personService.filteredPersons$;
  headers: string[] = ['First name', 'Last Name', 'Age'];

  constructor(private readonly personService: PersonService) {}
}
