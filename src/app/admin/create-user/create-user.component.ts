import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service/service.service';
import { ToastrServices } from '../../toaster/toaster.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  name!: string;
  employeeId!: string;
  email!: string;
  age!: string;
  designation!: string;
  phone!: string;
  address!: string;
  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ServiceService,
    private toastr: ToastrServices
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(): void {
    let payload = {
      name: this.name,
      age: this.age,
      designation: this.designation,
      phone: this.phone,
      employee_id: this.employeeId,
      email: this.email,
      address: this.address,
    };

    this.service.createUser(payload).subscribe({
      next: (res: any) => {
        if (res.result) {
          this.toastr.success('Employee Created','');
          this.dialogRef.close(true);
        }else{
          this.toastr.error(res.message,'');
        }
      },
      error: (err: any) => {
        this.toastr.error(err.error.message,'');
      },
    });
  }
}
