import { PersonFilter } from './../models/person-filter';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PersonService } from './person.service';

@Component({
  selector: 'person-filter',
  templateUrl: './person-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonFilterComponent implements OnInit, OnDestroy {
  formGroup: FormGroup = new FormGroup({
    search: new FormControl(''),
    isAdult: new FormControl(false)
  });

  private unsubscribe$ = new Subject();

  constructor(private readonly personService: PersonService) {}

  ngOnInit(): void {
    const searchControl = this.formGroup.get('search') as AbstractControl;
    searchControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$), debounceTime(300))
      .subscribe((value) => {
        this.personService.setPersonFilter(new PersonFilter({ ...this.formGroup.value, search: value }));
      });

    const isAdult = this.formGroup.get('isAdult') as AbstractControl;
    isAdult.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.personService.setPersonFilter(new PersonFilter({ ...this.formGroup.value, isAdult: value,  }));
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
