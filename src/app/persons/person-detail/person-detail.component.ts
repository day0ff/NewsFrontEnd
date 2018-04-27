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
import {NewsService} from '../../service/news.service';
import {News} from '../../entity/news';
import {Img} from '../../entity/img';
import {User} from '../../entity/user';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})

export class PersonDetailComponent implements OnInit {
  person: Person;
  news: News[];
  imgGroups: Group [] = Img.imgUser;
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

  saveRoles() {
    const roles: number[] = [];
    this.rolesTypes.forEach(
      role => {
        roles.push(role.id);
      }
    );
    console.log('User id = ' + this.person.user.id);
    this.userService.addUserRoles(this.person.user.id, roles)
      .subscribe(() => console.log('Add Roles'),
        error => console.log('Failed add Roles'));
  }

  getComments(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.commentsService.getCommentsPerson(+id)
      .subscribe(comments => this.comments = comments,
        error => console.log('Comments error + ' + error));
  }

  getNews() {
    const id = this.route.snapshot.paramMap.get('id');
    this.newsService.getNewsByPrson(+id).subscribe(news => this.news = news,
      error => console.log('News not found'));
  }

  saveUser() {
    this.userService.updateUser(this.person.user)
      .subscribe(user => {
          this.person.user = user;
          this.saveRoles();
        },
        error => console.log('Error to update User'));
  }

  updatePerson(): void {
    this.personService.updatePerson(this.person)
      .subscribe(person => {
          this.person = person;
        },
        error => console.log('Error to update Person'));
  }

  deletePerson(): void {
    this.personService.deletePerson(this.person.user.userName, this.person.user.password, this.person.id)
      .subscribe(() => {
        console.log('Delete Person');
        this.router.navigateByUrl('/persons');
      }, () => console.log('Can not delete Person'));
  }


  goBack(): void {
    this.location.back();
  }

  constructor(private route: ActivatedRoute,
              private personService: PersonService,
              private userService: UserService,
              private rolesService: RolesService,
              private commentsService: CommentsService,
              private newsService: NewsService,
              private location: Location,
              private router: Router) {
  }

  ngOnInit() {
    this.getPerson();
    this.getRoles();
    this.getComments();
    this.getNews();
  }
}
