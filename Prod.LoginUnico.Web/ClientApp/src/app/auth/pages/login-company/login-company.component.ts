import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComponenteLoginService } from 'src/app/services/componenteLogin.service';
import Stepper from 'bs-stepper';
import { LoginRequest } from '../../interfaces/request/login.request';
import { LogoRequest } from '../../interfaces/request/logo.request';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { RegisterRepository } from '../../repositories/register.repository';

@Component({
  selector: 'app-login-company',
  templateUrl: './login-company.component.html'
})
export class LoginCompanyComponent implements OnInit {
  @ViewChild('stepper', { static: true }) steps: any;
  stepper?: Stepper;
  applicationId : number = 0;
  logo?: SafeUrl;
  loginRequest?: LoginRequest;
  recaptchaToken?: string;

  constructor(
    private spinner: NgxSpinnerService,
    private componenteLoginService: ComponenteLoginService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private registerRepository: RegisterRepository,
  ) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.applicationId = params['applicationId'] || null;
      this.loadLogo();
    });
  }

  loadLogo() {
    this.spinner.show();
    var request: LogoRequest = {
      applicationId: this.applicationId,
    };

    this.registerRepository.logo(request).subscribe({
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

