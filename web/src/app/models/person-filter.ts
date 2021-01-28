export class PersonFilter {
  search: string;
  isAdult: boolean;

  constructor(values: PersonFilter) {
    this.search = values.search;
    this.isAdult = values.isAdult;
  }
}
