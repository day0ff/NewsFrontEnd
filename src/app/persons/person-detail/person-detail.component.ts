import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {Person} from '../../entity/person';
import {PersonService} from '../../service/person.service';
import {Group} from '../../entity/group';
import {RolesService} from '../../service/roles.servicce';
import {Roles} from '../../entity/roles';
import {CommentsService} from '../../service/comments.service';
import {Comment} from '../../entity/comment';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})

export class PersonDetailComponent implements OnInit {
  @Input() person: Person;
  imgGroups: Group [] = [{id: 1, name: 'hamster.png'}, {id: 2, name: 'hamster_head.png'}, {id: 3, name: 'human.png'}];
  comments: Comment[] = [];

  roles: Roles[];
  rolesTypes: Group[] = [];
  rolesGroups: Group[] = [];

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

  getRoles(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.rolesService.getRolesPerson(+id)
        .subscribe(
          roles => {
            this.roles = roles;
            this.roles.forEach(role =>
              this.rolesTypes.push({id: role.id, name: role.role})
            );
          });
    } else {
      this.roles = [];
    }
    this.rolesService.getRoles()
      .subscribe(roles => {
        roles.forEach(role =>
          this.rolesGroups.push({id: role.id, name: role.role})
        );
      });
  }

  getComments(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.commentsService.getCommentsPerson(+id)
      .subscribe(comments => this.comments = comments,
        error => console.log('Comments error + ' + error));
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
              private rolesService: RolesService,
              private commentsService: CommentsService,
              private location: Location,
              private router: Router) {
  }

  ngOnInit() {
    this.getPerson();
    this.getRoles();
    this.getComments();
  }
}
