import {Component, OnInit} from '@angular/core';
import {Person} from '../entity/person';
import {PersonService} from '../service/person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
/**
 * The class implements component management PersonsComponent.
 */
export class PersonsComponent implements OnInit {
  /**
   * property - of persons array
   */
  persons: Person[];
  /**
   * The method requests persons.
   */
  getPersons(): void {
    this.personService.getPersons()
      .subscribe(persons => {
        this.persons = persons.sort((p1, p2) => p1.id - p2.id);
      });
  }
  /**
   * Creates a new default object PersonsComponent
   * @constructor
   */
  constructor(private personService: PersonService) {
  }
  /**
   * Initializes the PersonsComponent class after it is created.
   */
  ngOnInit() {
    this.getPersons();
  }
}
