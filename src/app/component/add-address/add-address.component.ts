import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css'],
})
export class AddAddressComponent implements OnInit {
  formData: any = {
    walletId: '',
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onAddAddressSubmit() {
    this.userService.addUserAddress(this.formData).subscribe(
      (response) => {
        console.log('Address added successfully:', response);
       // location.reload();
        setTimeout(() => {
          this.router.navigate(['/user-address']);
        }, 10); 
      },
      (error) => {
        console.error('Error adding address:', error);
      }
    );
  }
}
