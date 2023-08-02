import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  formData: any = {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.userService.getUserId();
    console.log('Here is userID', userId);
    if (userId !== null) {
      this.userService.getUserProfile(userId).subscribe(
        (userProfile) => {
          this.formData = { ...userProfile };
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    } else {
      console.error('User is not authenticated.');
    }
  }

  onSubmit() {
    const userId = this.userService.getUserId();
    if (userId !== null) {
      this.userService.updateUserProfile(userId, this.formData).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    } else {
      console.error('User is not authenticated.');
    }
  }
}
