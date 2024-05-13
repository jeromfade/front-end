import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrServices {

  constructor(private toastr: ToastrService) { }

  success(message:any,title:any) {
    this.toastr.success(message,title);
  }

  warning(message:any,title:any){
    this.toastr.warning(message,title);
  }

  info(message:any,title:any){
    this.toastr.info(message,title);
  }

  error(message:any,title:any){
    this.toastr.error(message,title);
  }
}