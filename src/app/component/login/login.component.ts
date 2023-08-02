import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formData = {
    email: '',
    password: '',
  };
  user: any = {};

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {}

  onLoginSubmit() {
    const { email, password } = this.formData;
    this.userService.login(email, password).subscribe(
      (response) => {
        console.log('User logged in successfully:', response);
        localStorage.setItem('token', response.token);
        this.showLoginSuccess();
        setTimeout(() => {
          this.router.navigate(['/user-address']);
        }, 1000); 
      },
      (error) => {
        console.error('Error logging in user:', error);
      }
    );
  }
  

  showLoginSuccess() {
    this.toastr.success('Login Success!', 'Success!');
  }

}
