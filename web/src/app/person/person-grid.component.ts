import { GridApi, GridOptions, GridReadyEvent } from '@ag-grid-community/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/person';
import { PersonService } from './person.service';

@Component({
  selector: 'person-grid',
  templateUrl: './person-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonGridComponent{
  persons$: Observable<Person[]> = this.personService.persons$;
  gridOptions: GridOptions = {
    defaultColDef: {
      flex: 1,
    },
    columnDefs: [
      { headerName: '#', field: 'id', minWidth: 25 },
      { headerName: 'First name', field: 'firstName' },
      { headerName: 'Last name', field: 'lastName' },
      { headerName: 'Age', field: 'age' }
    ],
    rowSelection: 'single',
    rowDeselection: true
  };
  private gridApi: GridApi|null = null;

  constructor(private readonly personService: PersonService) {}

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
  }

  onSelectionChanged(): void {
    if (this.gridApi !== null) {
      const selectedPersons: Person[] = this.gridApi.getSelectedRows();
      if (selectedPersons.length > 0) {
        this.personService.setSelectedPerson(selectedPersons[0]);
      }
    }
  }

  onDataChanged(): void {
    if (this.gridApi !== null) {
      this.personService.setSelectedPerson(null);
    }
  }
}
