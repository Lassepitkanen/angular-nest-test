import { PersonService } from './person.service';

describe('PersonService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let personService: PersonService;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    personService = new PersonService(httpClientSpy as any);
  });

  it('addPerson - should add persons', () => {
    personService.addPerson({firstName: 'Foo', lastName: 'Bar', id: 1, age: 20});
    personService.addPerson({firstName: 'Foo', lastName: 'Bar', id: 2, age: 20});
    personService.addPerson({firstName: 'Foo', lastName: 'Bar', id: 3, age: 20});

    personService.persons$.subscribe(persons => {
      expect(persons.length).toBe(3);
    });
  });

  it('deleteSelectedPerson - should delete person', () => {
    personService.addPerson({firstName: 'Foo', lastName: 'Bar', id: 1, age: 20});
    personService.addPerson({firstName: 'Bar', lastName: 'Foo', id: 2, age: 25});
    personService.setSelectedPerson({firstName: 'Foo', lastName: 'Bar', id: 1, age: 20});
    personService.deleteSelectedPerson();

    personService.persons$.subscribe(persons => {
      expect(persons.length).toBe(1);
    });
  });

  it('filteredPersons - should return correct person', () => {
    personService.addPerson({firstName: 'Foo', lastName: 'Bar', id: 1, age: 15});
    personService.addPerson({firstName: 'Bar', lastName: 'Foo', id: 2, age: 25});
    personService.addPerson({firstName: 'Hi', lastName: 'Hey', id: 3, age: 30});
    personService.addPerson({firstName: 'Hi', lastName: 'Hey', id: 4, age: 15});

    personService.setPersonFilter({ search: 'hi', isAdult: true });

    personService.filteredPersons$.subscribe(persons => {
      expect(persons.length).toBe(1);
      expect(persons[0].firstName).toBe('Hi');
    });
  });
});
