import { PersonService } from './person.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'person-form',
  templateUrl: './person-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonFormComponent {
  form = new FormGroup({
    id: new FormControl(1),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
  });

  constructor(private readonly personService: PersonService) { }

  onSubmit() {
    this.personService.addPerson(this.form.value);
    this.form.reset();
  }
}

