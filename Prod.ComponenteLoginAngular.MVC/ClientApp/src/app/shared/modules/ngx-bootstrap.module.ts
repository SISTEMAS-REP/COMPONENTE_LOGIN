import { NgModule } from '@angular/core';
import { defineLocale } from "ngx-bootstrap/chronos";
import { esLocale } from "ngx-bootstrap/locale";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { ModalModule } from "ngx-bootstrap/modal";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';

defineLocale("es", esLocale);

@NgModule({
  imports: [
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    TooltipModule.forRoot(),
    TimepickerModule.forRoot(),
    AccordionModule.forRoot(),
  ],
  exports: [
    PaginationModule,
    BsDropdownModule,
    BsDatepickerModule,
    ModalModule,
    TypeaheadModule,
    TooltipModule,
    TimepickerModule,
    AccordionModule,
  ]
})
export class NgxBootstrapModule { }
