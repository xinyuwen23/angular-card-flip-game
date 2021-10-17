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

  addUser(user: any) {
    this.admin.addUser(user).subscribe((_) => {
      this.getUsers();
      this.message.openSnackBar('User added', 'Close');
    });
  }

  updateUser(user: any) {
    this.admin.updateUser(user).subscribe((_) => {
      this.getUsers();
      this.message.openSnackBar('User updated', 'Close');
    });
  }

  deleteUser(userId: string) {
    this.admin.deleteUser(userId).subscribe((_) => {
      this.getUsers();
      this.message.openSnackBar('User deleted', 'Close');
    });
  }
}
