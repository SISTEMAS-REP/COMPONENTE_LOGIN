import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LogoRequest } from 'src/app/auth/interfaces/request/logo.request';
import { LoginRepository } from 'src/app/auth/repositories/login.repository';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {

  applicationId: number = 0;
  returnUrl?: string = '';
  logo?: SafeUrl;
  constructor(
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private loginRepository: LoginRepository,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.applicationId = params['applicationId'] || null;
      this.loadLogo();
    });
  }

  loadLogo() {
    this.spinner.show();
    var request: LogoRequest = {
      applicationId: this.applicationId,
    };

    this.loginRepository.logo(request).subscribe({
      next: (data) => {
        this.spinner.hide();
        let objectURL = 'data:image/png;base64,' + data;
        this.logo = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: (err) => {
        this.spinner.hide();
        console.log('loadLogo-error', err);
      },
    });
  }

}
