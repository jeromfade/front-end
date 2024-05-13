import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import { ToastrServices } from '../toaster/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(
    private authService: ServiceService,
    private router: Router,
    private toastr: ToastrServices
  ) {}
  OnInit() {}
  onSubmit(event: Event) {
    event.preventDefault();
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: (res: any) => {
          if (res.result) {
            const { apiKey, userId, userRole } = res.data;
            this.authService.setLocalStorage(apiKey, userId, userRole);
            this.toastr.success('Login Successfull', '');
            if (userRole === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/user']);
            }
          }
        },
        error: (err: any) => {
          console.log(err.error);
          this.toastr.error(err.error.message, '');
        },
      });
    }
  }
}
