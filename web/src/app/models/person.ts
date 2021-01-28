export class Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;

  constructor(values: Person) {
    this.id = values.id;
    this.firstName = values.firstName;
    this.lastName = values.lastName;
    this.age = values.age;
  }
}
