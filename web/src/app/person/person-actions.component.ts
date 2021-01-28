import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, interval, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Person } from '../models/person';
import { PersonService } from './person.service';

@Component({
  selector: 'person-actions',
  templateUrl: './person-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonActionsComponent {
  selectedPerson$: Observable<Person|null> = this.personService.selectedPerson$;
  secondsSinceLastUpdate: Subject<number> = new Subject();

  private lastUpdateAt: number = 0;
  private unsubscribe$ = new Subject();

  constructor(private readonly personService: PersonService) {
    this.personService.persons$
      .pipe(takeUntil(this.unsubscribe$), distinctUntilChanged())
      .subscribe(() => {
        this.lastUpdateAt = Date.now() / 1000;
      });

    interval(500)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.secondsSinceLastUpdate.next(Math.round(Date.now() / 1000 - this.lastUpdateAt));
      });
  }

  getPersons(): void {
    this.personService.getInitialPersons();
  }

  deletePerson(): void {
    this.personService.deleteSelectedPerson();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.secondsSinceLastUpdate.complete()
  }
}
