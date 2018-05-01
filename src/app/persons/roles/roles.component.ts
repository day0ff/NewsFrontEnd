import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../entity/user';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  @Input() user: User;

  roles: string [];

  getRoles(): void {
    this.userService.getUserRoles(this.user.userName, this.user.password).subscribe(roles => {
      this.roles = roles;
    });
  }
  /**
   * Creates a new default object RolesComponent
   * @constructor
   */
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getRoles();
  }

}
