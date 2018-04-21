import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {Person} from '../../entity/person';
import {PersonService} from '../../service/person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})

export class PersonDetailComponent implements OnInit {
  @Input() person: Person;
  roles: string [];

  getPerson(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.personService.getPerson(+id)
        .subscribe(
          person => {
            this.person = person;
          });
    } else {
      this.person = new Person(null, null, null, null, null, null);
    }
  }

  getPersonRoles(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.personService.getPersonRoles(+id)
        .subscribe(
          roles => {
            this.roles = roles;
          });
    } else {
      this.roles = [];
    }
  }

  savePerson(): void {
    this.personService.savePerson(this.person)
      .subscribe(person => {
        this.person = person;
        this.location.replaceState('/persons/details/' + person.id);
      });
  }

  deletePerson(): void {
    this.personService.deletePerson(this.person).subscribe(
      response => {
        this.router.navigateByUrl('/persons');
      });
  }

  updatePerson(): void {
    this.personService.updatePerson(this.person).subscribe();
  }

  saveUser(): void {
    /* this.personService.savePerson(this.person)
       .subscribe(person => {
         this.person = person;
         this.location.replaceState('/persons/details/' + person.newsId);
       });*/
  }

  updateUser(): void {
    // this.personService.updatePerson(this.person).subscribe();
  }

  goBack(): void {
    this.location.back();
  }

  constructor(private route: ActivatedRoute,
              private personService: PersonService,
              private location: Location,
              private router: Router) {
  }

  ngOnInit() {
    this.getPerson();
    this.getPersonRoles();
  }
}
