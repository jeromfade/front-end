import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private service: ServiceService) {}
  userData: any = [];
  ngOnInit() {
    this.viewProfile();
  }

  viewProfile(): void {
    this.service.userView().subscribe({
      next: (res: any) => {
        if (res.result) {
          console.log(res.data);
          this.userData = res.data;
        }
      },
      error: (err: any) => {
        alert(err.error.message);
      },
    });
  }
}
