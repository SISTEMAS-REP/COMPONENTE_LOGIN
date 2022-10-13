import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PresentationComponent } from './pages/presentation/presentation.component';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, PresentationComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    //CommonModule,
    //FormsModule,
    BrowserAnimationsModule,

    AppRoutingModule,

    NgxSpinnerModule,
    ToastrModule.forRoot({
      preventDuplicates: false,
    }),

    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
