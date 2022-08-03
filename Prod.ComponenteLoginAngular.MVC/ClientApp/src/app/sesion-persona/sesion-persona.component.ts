import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sesion-persona',
  templateUrl: './sesion-persona.component.html',
  styleUrls: ['./sesion-persona.component.css']
})
export class SesionPersonaComponent implements OnInit {

  numero_documento : string = null;
  contrasena : string = null;

  validadorNroDocumento: boolean = false;
  validadorContrasena: boolean = false;
  id_aplicacion : number = 0;

  contentType: string = "image/png";
  urlArchivo: SafeResourceUrl;

  constructor(
    private http: HttpClient, 
    @Inject('BASE_URL') private baseUrl: string,
    private spinner: NgxSpinnerService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.id_aplicacion = params['id_aplicacion'] || null;
      this.obtenerImagenByAplicacion();
    });
  }

  obtenerImagenByAplicacion = () =>{
    let Data = {
      id_aplicacion: this.id_aplicacion
    }
    const formData = {...Data};
    this.http.post(this.baseUrl + 'ComponenteLogin/Obtener_Imagen_By_Aplicacion', formData).subscribe((result : any) => {
      debugger
      var binary = atob(result.data.replace(/\s/g, ''));
          var len = binary.length;
          var buffer = new ArrayBuffer(len);
          var view = new Uint8Array(buffer);
          for (var e = 0; e < len; e++) {
            view[e] = binary.charCodeAt(e);
          }
          var blob = new Blob([view], { type: this.contentType });
          var urlArchivo = URL.createObjectURL(blob);
          this.urlArchivo= this.sanitizer.bypassSecurityTrustResourceUrl(urlArchivo);
    }, error => console.error(error));
  }

  iniciarSesionPersonaNatural = () =>{
    this.changeNroDocumento();
    this.changeContrasena();

    if(!this.validadorNroDocumento && !this.validadorContrasena){
      this.spinner.show();
      let Data = {
        dni: this.numero_documento,
        clave: this.contrasena
      }
      const formData = {...Data};
      this.http.post(this.baseUrl + 'ComponenteLogin/IniciarSesionExtranet', formData).subscribe(result => {
      this.spinner.hide();
      }, error => console.error(error));
    }
   
  }

  changeNroDocumento = () =>{
    if(this.numero_documento == null || this.numero_documento == ""){
      this.validadorNroDocumento = true;
    }
    else{
      this.validadorNroDocumento = false;
    }
  }

  changeContrasena = () =>{
    if(this.contrasena == null || this.contrasena == ""){
      this.validadorContrasena = true;
    }
    else{
      this.validadorContrasena = false;
    }
  }

  mostrarContrasena(){
    let contrasena :any = document.getElementById('contrasena');
    let eyeContrasena :any = document.getElementById('eyeContrasena');
    
    if(contrasena.type == "password"){
      contrasena.type = "text";
      eyeContrasena.style.opacity=0.8;
    }
    else{
      contrasena.type = "password";
      eyeContrasena.style.opacity=0.4;
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


}
