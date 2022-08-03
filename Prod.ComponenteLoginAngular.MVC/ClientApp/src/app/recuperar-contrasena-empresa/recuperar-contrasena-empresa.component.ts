import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-recuperar-contrasena-empresa',
  templateUrl: './recuperar-contrasena-empresa.component.html',
  styleUrls: ['./recuperar-contrasena-empresa.component.css']
})
export class RecuperarContrasenaEmpresaComponent implements OnInit {

  numeroDocumento : string = null;
  validarRuc : boolean = false;
  validaSuccess: boolean = false;
  constructor(
    private http: HttpClient, 
    @Inject('BASE_URL') private baseUrl: string,
    private spinner: NgxSpinnerService,
    private notification: NzNotificationService,
  ) {
  }
  ngOnInit(): void {
  }

  
  fnBtnRecuperarContrasena = () => {
    this.changeRuc();
    if(!this.validarRuc)
    {
      this.spinner.show();
      let Data = {
        numeroDocumento: this.numeroDocumento,
      }
      
      const formData = {...Data};
      this.http.post(this.baseUrl + 'ComponenteLogin/RecuperarContrasena', formData).subscribe(result => {
        this.spinner.hide();
        this.validaSuccess = true;
      }, error => console.error(error));
    }
    
   }

   changeRuc = () =>{
    if(this.numeroDocumento == null || this.numeroDocumento == ""){
      this.validarRuc = true;
    }
    else{
      if(this.numeroDocumento.length < 11){
        this.validarRuc = true;
      }
      else{
        this.validarRuc = false;
      }
     
    }
  }

  public restrictNumeric(e) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
     return false;
    }
    if (e.which === 0) {
     return true;
    }
    if (e.which === 46) {
      return true;
     }
    if (e.which < 33) {
      return true;
    }
    if (e.which === 188){
        return true;
      }
     

    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
   }

   createNotification = (type: string, title: string, message: string): void => {
    this.notification.create(
      type,
      title,
      message
    );
  };
  
}
