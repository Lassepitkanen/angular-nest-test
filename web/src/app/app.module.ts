import { PersonActionsComponent } from './person/person-actions.component';
import { PersonFormComponent } from './person/person-form.components';
import { PersonGridComponent } from './person/person-grid.component';
import { AgGridModule } from '@ag-grid-community/angular';
import { PersonTableComponent } from './person/person-table.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonFilterComponent } from './person/person-filter.component';

ModuleRegistry.registerModules([
  ClientSideRowModelModule
]);

@NgModule({
  declarations: [
    AppComponent,
    PersonTableComponent,
    PersonGridComponent,
    PersonFormComponent,
    PersonActionsComponent,
    PersonFilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
