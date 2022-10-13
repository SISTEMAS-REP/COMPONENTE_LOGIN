import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxDatatableModule } from '@siemens/ngx-datatable';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderCardComponent } from './components/header-card/header-card.component';
import { CustomDatatableComponent } from './components/custom-datatable/custom-datatable.component';
@NgModule({
  declarations: [HeaderCardComponent, CustomDatatableComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CollapseModule,
    PerfectScrollbarModule,
    BsDropdownModule,
    NgxDatatableModule,
    NgxSpinnerModule,
  ],
  exports: [CustomDatatableComponent],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class SharedModule {}
