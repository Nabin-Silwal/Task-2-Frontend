import { Component, OnInit } from '@angular/core';
import { EditAddressData } from 'src/app/model/address.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css'],
})
export class UserAddressComponent implements OnInit {
  userAddresses: any[] = [];
  selectedAddress: any;

  selectedAddressIndex: number = -1;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUserAddresses();
  }

  getUserAddresses() {
    this.userService.getUserAddresses().subscribe(
      (response) => {
        this.userAddresses = response;
      },
      (error) => {
        console.error('Error fetching user addresses:', error);
      }
    );
  }

  onDeleteAddress(walletId: string) {
    if (confirm('Are you sure you want to delete this address?')) {
      this.userService.deleteUserAddress(walletId).subscribe(
        (response) => {
          console.log('Address deleted successfully:', response);
          // Remove the deleted address from the userAddresses array on the client-side
          this.userAddresses = this.userAddresses.filter(
            (address) => address.walletId !== walletId
          );
        },
        (error) => {
          console.error('Error deleting address:', error);
        }
      );
    }
  }

  // onEditAddress(address: any, index: number) {
  //   console.log('Selected Address:', address);
  //   this.selectedAddressIndex = index;
  //   this.selectedAddress = { ...address };
  // }

  onEditAddress(address: any, index: number) {
    this.selectedAddressIndex = index; // Set the selectedAddressIndex to the index of the selected address
    this.selectedAddress = { ...address };
  }

  onAddressUpdated(updatedAddress: EditAddressData) {
    // Update the userAddresses array with the updated address
    if (this.selectedAddressIndex !== -1) {
      this.userAddresses[this.selectedAddressIndex] = updatedAddress;
      this.selectedAddress = { ...updatedAddress };
    }
  }
}
