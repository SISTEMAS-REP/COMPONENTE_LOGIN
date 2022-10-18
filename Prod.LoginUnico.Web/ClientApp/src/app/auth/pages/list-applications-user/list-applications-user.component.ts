import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/services/toast.service';
import { ListApplicationsRequest } from '../../interfaces/request/list-applications.request';
import { ListApplicationsRepository } from '../../repositories/list-applications.repository';


@Component({
  selector: 'app-list-applications-user',
  templateUrl: './list-applications-user.component.html'
})
export class ListApplicationsUserComponent implements OnInit {
  applicationId: number = 0;
  returnUrl?: string;
  persona: any;
  listaAplicaciones: Array<any> = [];
  contentType: string = "image/png";
  urlArchivo: SafeResourceUrl | undefined;
  url: string = "";

  // ListApplicationsRequest?: ListApplicationsRequest;

  constructor(
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ListApplicationsRepository: ListApplicationsRepository,
    private spinner: NgxSpinnerService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.applicationId = params['applicationId'] || null;
      this.returnUrl = params['returnUrl'];
      //this.url = "W3Y9more8V78gBM5OXAoZVW0eieVjlgwIslash1zxVmAlDVKSIequal";
       this.url = params['var'] || null;
    });
    this.listApplicationsUser();
  }


  listApplicationsUser() {
    let data : ListApplicationsRequest = {
      UserName: this.url,
      url: this.url
    }


    this.ListApplicationsRepository
      .listApplicationsUser(data)
      .subscribe({
        next: (dato:any) => {
        this.listaAplicaciones = dato.data.applicationUser;
          if(dato.data.applicationUser.length != 0){
            for (var i = 0; i < dato.data.applicationUser.length; i++) {
              var binary = atob(dato.data.applicationUser[i].conten_img.replace(/\s/g, ''));
              var len = binary.length;
              var buffer = new ArrayBuffer(len);
              var view = new Uint8Array(buffer);
              for (var e = 0; e < len; e++) {
                view[e] = binary.charCodeAt(e);
              }
              var blob = new Blob([view], { type: this.contentType });
              var urlArchivo = URL.createObjectURL(blob);
              this.urlArchivo= this.sanitizer.bypassSecurityTrustResourceUrl(urlArchivo);
              this.listaAplicaciones[i].urlArchivo = this.urlArchivo;
            }
          }

        },
        error: (err) => {
          this.spinner.hide();
          console.log('listApplicationsUser-error', err);

          this.toastService.danger(err.error.detail, err.error.title);
        },
      });
  }



}
