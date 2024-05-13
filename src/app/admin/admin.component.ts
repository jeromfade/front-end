import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from './create-user/create-user.component';
import { RemoveUserComponent } from './remove-user/remove-user.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(private service: ServiceService, public dialog: MatDialog) {}
  users: any[] = [];

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.service.userList().subscribe({
      next: (res: any) => {
        console.log(res);

        if (res.result) {
          this.users = res.data;
        }
      },
      error: (err: any) => {},
    });
  }

  openDialog(action: string): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      data: {
        action,
        title: action === 'Create' ? 'Add User' : 'Update User',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUserList();
      }
    });
  }

  removeUser(userId: number): any {
    const dialogRef = this.dialog.open(RemoveUserComponent, {
      data: {
        userId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUserList();
      }
    });
  }
}
