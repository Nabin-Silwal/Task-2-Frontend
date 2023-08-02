import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  formData = {
    name: '',
    email: '',
    password: '',
    contact: '',
    gender: '',
    age: '',
  };

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {}

  onRegisterSubmit() {
    this.userService.registerUser(this.formData).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        // Redirect to login page or show a success message
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000); 
      },
      (error) => {
        console.error('Error registering user:', error);
        // Handle registration error, e.g., show error message to the user
      }
    );
  }

  showRegisterSuccess() {
    this.toastr.success('Register Success!', 'Success!');
  }

}
