import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

const DATE_FORMAT = "DD/MM/YYYY";

@Pipe({
    name: "dateFormat"
})
export class DateFormatPipe implements PipeTransform {
    transform(value: any, defaultMsg: string, format: string = null): any {
        if (!value) return defaultMsg !== null ? defaultMsg : "-";

        return moment(value).format(format ? format : DATE_FORMAT);
    }
}
