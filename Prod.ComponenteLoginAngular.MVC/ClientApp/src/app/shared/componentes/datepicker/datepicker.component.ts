import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BsDatepickerConfig, BsLocaleService } from "ngx-bootstrap/datepicker";
import * as moment from "moment";

const DATE_FORMAT = "MM/YYYY";

@Component({
    selector: "app-datepicker",
    templateUrl: "./datepicker.component.html",
    styleUrls: ["./datepicker.component.css"]
})
export class DatepickerComponent implements OnInit {

    @Output()
    ModelChange = new EventEmitter();

    @Input()
    Model: any;

    @Input()
    minDate?: moment.Moment;

    @Input()
    maxDate?: moment.Moment;

    @Input()
    disabled: Boolean = false;

    bsConfig: Partial<BsDatepickerConfig>;

    @Input()
    dateFormat: string = "MM/DD/YYYY";

    constructor(private localeService: BsLocaleService) {
        this.localeService.use("es");
    }

    ngOnInit(): void {
        const _maxDate: Date = this.maxDate ? this.maxDate.toDate() : null;
        const _minDate: Date = this.minDate ? this.minDate.toDate() : null;
        this.bsConfig = {
            ...this.bsConfig,
            containerClass: "theme-default theme-datepicker-produce",
            dateInputFormat: 'MM/DD/YYYY',
            minDate: _minDate,
            maxDate: _maxDate,
            showWeekNumbers: false
        };
    }

    onDateChange(value: Date): void {

        this.Model = moment(value).utc(true);
        var utc = moment.utc().valueOf();

        this.ModelChange.emit(this.Model);
    }
}
