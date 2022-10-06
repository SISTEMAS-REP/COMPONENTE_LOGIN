import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/services/toast.service';
import { ListApplicationsRequest } from '../../interfaces/request/list-applications.request';
import { ListApplicationsRepository } from '../../repositories/list-applications.repository';


@Component({
  selector: 'app-list-applications-user',
  templateUrl: './list-applications-user.component.html'
})
export class ListApplicationsUserComponent implements OnInit {
  persona: any;
  listaAplicaciones: Array<any> | undefined;
  contentType: string = "image/png";
  urlArchivo: SafeResourceUrl | undefined;
  url: string = "";

  ListApplicationsRequest?: ListApplicationsRequest;

  constructor(
    private sanitizer: DomSanitizer,
    private router: ActivatedRoute,
    private ListApplicationsRepository: ListApplicationsRepository,
    private spinner: NgxSpinnerService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.url = "W3Y9more8V78gBM5OXAoZVW0eieVjlgwIslash1zxVmAlDVKSIequal";
      // this.url = params['var'] || null; 
    });
    this.listApplicationsUser();
  }


  // fnCargarAplicaciones = () =>{
  //   let data = {
  //      url: this.token
  //   }
  //   this.componenteLoginService.ListAplicacionesByUsuario(data)
  //   .then(resp => {
  //     this.listaAplicaciones = resp;
  //     if(resp.length != 0){
  //       for (var i = 0; i < resp.length; i++) {
  //         var binary = atob(resp[i].conten_img.replace(/\s/g, ''));
  //         var len = binary.length;
  //         var buffer = new ArrayBuffer(len);
  //         var view = new Uint8Array(buffer);
  //         for (var e = 0; e < len; e++) {
  //           view[e] = binary.charCodeAt(e);
  //         }
  //         var blob = new Blob([view], { type: this.contentType });
  //         var urlArchivo = URL.createObjectURL(blob);
  //         this.urlArchivo= this.sanitizer.bypassSecurityTrustResourceUrl(urlArchivo);
  //         this.listaAplicaciones[i].urlArchivo = this.urlArchivo;
  //       }
  //     }
  //   })
  //   .catch(err => []);
  // }



  listApplicationsUser() {
    debugger;
    this.ListApplicationsRepository
      .listApplicationsUser(this.url!)
      .subscribe({
        next: () => {
        debugger;

        },
        error: (err) => {
          this.spinner.hide();
          console.log('listApplicationsUser-error', err);

          this.toastService.danger(err.error.detail, err.error.title);
        },
      });
  }
  


}
