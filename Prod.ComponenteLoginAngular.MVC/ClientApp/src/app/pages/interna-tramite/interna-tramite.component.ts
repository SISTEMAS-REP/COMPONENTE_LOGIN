import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialogConfig,MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { tupaModel } from 'src/app/interfaces/models/tupaModel';
import { ComentarioService } from 'src/app/services/comentario.service';
import { TupaService } from 'src/app/services/tupa.service';
import { TupaRequisitoService } from 'src/app/services/tupaRequisito.service';
import { AlertService } from 'src/app/shared/componentes/services/alert.service';
import { ModalIniciarSesionTramiteComponent } from 'src/app/shared/modal/iniciar-sesion-tramite/iniciar-sesion-tramite.component';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-interna-tramite',
  templateUrl: './interna-tramite.component.html',
  // styleUrls: ['./interna-tramite.component.css']
})
export class InternaTramiteComponent implements OnInit {
  size = 1.5;
  isAuth = false;
  formTupa = new tupaModel();
  listaTupaRequisito: Array<any>;
  idTupa = 0;
  cantidadLike = 0;
  cantidadDislike = 0;
  
  constructor(elm: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private tupaRequisitoService: TupaRequisitoService,
    private tupaService: TupaService,
    private comentarioService: ComentarioService,
    private sanitizer: DomSanitizer,
    private alertService: AlertService,
    public dialog: MatDialog,
    private loginService: LoginService,) {
    if (localStorage.getItem('AppVusp')) {
      this.isAuth = true;
    }
  }

  ngOnInit(): void {
    this.formTupa.uit = 0;
    this.formTupa.cantidad = 0;
    this.idTupa = Number(this.route.snapshot.queryParams.IdTupa);
    this.fnCargarDatos(this.idTupa);

  }

  fnCargarDatos = (id) => {
    this.tupaService.tupaObtenerPorId({
      IdTupa: id
    })
      .then(resp => {
        let data = resp.data;
        this.formTupa.descripcion = data.descripcion;
        this.formTupa.uit = data.uit;
        this.formTupa.cantidad = data.cantidad;
        this.formTupa.numeroDias = data.numeroDias;
        this.formTupa.numeroTupa = data.numeroTupa;
        this.formTupa.nombreDependencia = data.nombreDependencia;
        this.formTupa.link = data.link;
        this.formTupa.automatizado = data.automatizado;
        this.formTupa.idTupa = id;
      })
      .catch(err => []);
    this.tupaRequisitoService.tupaRequisitoListar({
      IdTupa: id
    })
      .then(resp => {
        this.listaTupaRequisito = resp.data;
      })
      .catch(err => []);
      this.fnCargaMeGusta();
  }

  fnPrepararQS = () => {
   this.loginService.PreparaQS({      
     dni: "71998036",
     id: "55"
   })
   .then(resp => {
   })
   .catch(err => []);
  }

  fnCargaMeGusta = ()=>{
    this.comentarioService.listarLikeDislikePorTupa({
      IdTupa: this.idTupa
    })
      .then(resp => {
        let datos = resp.data;
        this.cantidadLike = datos.cantidadLike;
        this.cantidadDislike = datos.cantidadDislike;
      })
      .catch(err => []);
  }

  fnSubirBajarFuente = (sum) => {
    this.size = this.size + sum;
  };

  frDecimal = (num) => {
    return num.toFixed(2);
  }

  fnMeGusta = (meGusta)=>{
    this.comentarioService.registrarComentarioLikeDislike({
      IdTupa: this.idTupa,
      MeGusta: meGusta
    })
      .then(resp => {
        this.fnCargaMeGusta();
      })
      .catch(err => []);
  }

  fnSafeUrl = (url)=>{
    var x = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return x;
  }

  fnGoLink = (url, item ) =>{
    if (!this.isAuth) {
    //   this.alertService.open(
    //     "warning",
    //     "Para iniciar un trámite es necesario iniciar sesión como empresa o persona"
    // );
    if (localStorage.getItem('redirect')) {
      localStorage.removeItem('redirect');
    }
    
    if(item.automatizado){
      localStorage.setItem('redirect', JSON.stringify(url.changingThisBreaksApplicationSecurity));
    }
    else{
      var urlTupa = "/tramite-linea?IdTupa="+item.idTupa;
      localStorage.setItem('redirect', JSON.stringify(urlTupa));
    }
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      width: "30%",
      data: {},
      disableClose: true,
    }
    const dialogRef = this.dialog.open(ModalIniciarSesionTramiteComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (JSON.parse(result)) {
        console.log("Cerrado")
      }
    });

    }else{
      if(item.automatizado){
        var a = document.createElement('a');
        a.href = url.changingThisBreaksApplicationSecurity;
        a.target = '_blank';
        document.body.append(a);
        a.click();
        document.body.removeChild(a);
      }else{
        window.location.href = "/tramite-linea?IdTupa="+item.idTupa;
      }
    }
  }

}
