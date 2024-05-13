import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service/service.service';
import { ToastrServices } from 'src/app/toaster/toaster.service';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.css'],
})
export class RemoveUserComponent {
  constructor(
    public dialogRef: MatDialogRef<RemoveUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ServiceService,private toastr:ToastrServices
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(): void {
    let userId=this.data.userId;
    this.service.removeUser(userId).subscribe({
      next: (res: any) => {
        if (res.result) {
          this.toastr.success('Employee Removed','');
          this.dialogRef.close(true);
        } else {
          this.toastr.error(res.message,'');
        }
      },
      error: (err: any) => {
        this.toastr.error(err.error.message,'');
      },
    });
  }
}
