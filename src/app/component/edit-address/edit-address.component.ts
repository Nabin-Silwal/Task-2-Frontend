import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { EditAddressData } from 'src/app/model/address.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css'],
})
export class EditAddressComponent implements OnInit {
  @Input() address: any;
  formData: EditAddressData = {}; // Initialize an empty object for formData
  @Output() addressUpdated: EventEmitter<EditAddressData> =
    new EventEmitter<EditAddressData>();
  showForm: boolean = true;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Copy the values of the selected address to the formData object
    this.formData = { ...this.address };
  }

  // onEditAddressSubmit() {
  //   console.log('Selected Address:', this.address);
  //   this.userService
  //     .updateUserAddress(this.address.walletId, this.formData)
  //     .subscribe(
  //       (response) => {
  //         console.log('Address updated successfully:', response);
  //         this.addressUpdated.emit(this.formData);
  //         location.reload();
  //       },
  //       (error) => {
  //         console.error('Error updating address:', error);
  //       }
  //     );
  // }

  onEditAddressSubmit() {
    console.log('Selected Address:', this.address);
    this.userService
      .updateUserAddress(this.address.walletId, this.formData)
      .subscribe(
        (response) => {
          console.log('Address updated successfully:', response);
          setTimeout(() => {
            this.addressUpdated.emit(this.formData);
            this.router.navigate(['/user-address']);
          }, 1000);
        },
        (error) => {
          console.error('Error updating address:', error);
        }
      );
  }
}
