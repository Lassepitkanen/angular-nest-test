import { PersonFilter } from './../models/person-filter';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Person } from '../models/person';
import { map } from 'rxjs/operators';

const apiUrl = 'http://localhost:3000/';

@Injectable({ providedIn: 'root' })
export class PersonService {
  private personsBS: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);
  private get persons(): Person[] {
    return this.personsBS.getValue();
  }
  public readonly persons$: Observable<Person[]> = this.personsBS.asObservable();

  private selectedPersonBs: BehaviorSubject<Person|null> = new BehaviorSubject<Person|null>(null);
  private get selectedPerson(): Person|null {
    return this.selectedPersonBs.getValue();
  }
  public readonly selectedPerson$: Observable<Person|null> = this.selectedPersonBs.asObservable();

  private filterBS: BehaviorSubject<PersonFilter> = new BehaviorSubject<PersonFilter>({ search: '', isAdult: false });
  public readonly filteredPersons$: Observable<Person[]> = combineLatest([this.persons$, this.filterBS]).pipe(
    map(value => getFilteredPersons(value[0], value[1]))
  );

  constructor(private http: HttpClient) {}

  public getInitialPersons(): void {
    this.http.get<Person[]>(apiUrl + 'persons').toPromise().then(persons => {
      this.personsBS.next(persons);
    });
  }

  public addPerson(person: Person): void {
    person.id = this.persons.length > 0 ? Math.max(...this.persons.map(p => p.id)) + 1 : 1;
    this.personsBS.next([...this.persons, person]);
  }

  public deleteSelectedPerson(): void {
    if (this.selectedPerson !== null) {
      const id: number = this.selectedPerson.id;
      const persons: Person[] = this.persons.filter(p => p.id !== id);
      this.personsBS.next(persons);
    }
  }

  public setSelectedPerson(person: Person|null): void {
    this.selectedPersonBs.next(person);
  }

  public setPersonFilter(filter: PersonFilter): void {
    this.filterBS.next(filter);
  }
}

function getFilteredPersons(persons: Person[], filter: PersonFilter): Person[] {
  const searchFilter: string = filter.search.toLowerCase();
  return persons.filter((person) => {
    return (person.firstName.toLowerCase().indexOf(searchFilter) !== -1 || person.lastName.toLowerCase().indexOf(searchFilter) !== -1)
      &&
      (!filter.isAdult || person.age > 18)
  });
}
