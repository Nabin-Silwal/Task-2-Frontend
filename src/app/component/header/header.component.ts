import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(public userService: UserService, private router: Router) {}

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
