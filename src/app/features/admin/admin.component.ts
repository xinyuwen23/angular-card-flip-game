import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/core/services/admin.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  users: any;
  usersSubscription?: Subscription;

  constructor(private admin: AdminService, private message: MessageService) {}

  ngOnInit(): void {
    this.usersSubscription = this.admin.users$.subscribe((users) => {
      this.users = users;
    });
    this.getUsers();
  }

  ngOnDestroy() {
    this.usersSubscription?.unsubscribe();
  }

  getUsers() {
    this.admin
      .getUsers()
      .subscribe((data) => this.admin.users$.next(data.users));
  }

  addUser(user: { username: string; password: string }) {
    this.admin.addUser(user).subscribe((data) => {
      if (data.user) {
        this.getUsers();
        this.message.openSnackBar('User added', 'Close');
      } else {
        this.message.openSnackBar('Username has been taken', 'Close');
      }
    });
  }

  updateUser(user: { _id: string; username?: string; password?: string }) {
    this.admin.updateUser(user).subscribe((data) => {
      if (data.code === 0) {
        this.getUsers();
        this.message.openSnackBar('User updated', 'Close');
      } else {
        this.message.openSnackBar('Update failed', 'Close');
      }
    });
  }

  deleteUser(userId: string) {
    this.admin.deleteUser(userId).subscribe((data) => {
      if (data.code === 0) {
        this.getUsers();
        this.message.openSnackBar('User deleted', 'Close');
      } else {
        this.message.openSnackBar("User doesn't exist", 'Close');
      }
    });
  }
}
