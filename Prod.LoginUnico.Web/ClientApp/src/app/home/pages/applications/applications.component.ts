import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/services/toast.service';
import { ApplicationsRepository } from '../../repositories/applications.repository';
import { ApplicationResponse } from '../../interfaces/response/application.response';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: [],
})
export class ApplicationsComponent implements OnInit {
  contentType: string = 'image/png';
  applications: ApplicationResponse[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private router: ActivatedRoute,
    private applicationsRepository: ApplicationsRepository,
    private spinner: NgxSpinnerService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.listApplicationsUser();
  }

  listApplicationsUser() {
    this.spinner.show();
    this.applicationsRepository.applications().subscribe({
      next: (data: ApplicationResponse[]) => {
        data.map((app) => {
          const binary = atob(app.logo.replace(/\s/g, ''));
          const len = binary.length;
          const buffer = new ArrayBuffer(len);

          let view = new Uint8Array(buffer);
          for (var e = 0; e < len; e++) {
            view[e] = binary.charCodeAt(e);
          }

          const blob = new Blob([view], { type: this.contentType });
          const url = URL.createObjectURL(blob);
          const file = this.sanitizer.bypassSecurityTrustResourceUrl(url);

          app.url = file;
          return app;
        });

        this.applications = data;
        this.spinner.hide();
      },
      error: (err) => {
        this.spinner.hide();
        console.log('listApplicationsUser-error', err);

        this.toastService.danger(err.error.detail, err.error.title);
      },
    });
  }
}
