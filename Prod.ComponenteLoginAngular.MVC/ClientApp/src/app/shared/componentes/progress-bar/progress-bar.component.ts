import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-progress-bar",
    templateUrl: "./progress-bar.component.html",
    styleUrls: ["./progress-bar.component.css"]
})
export class ProgressBarComponent implements OnInit {
    Themes: object = {
        primary: {
            backgroundWrapper: "#ff8085",
            backgroundBar: "#dc3545"
        },
        secondary: {
            backgroundWrapper: "#eee",
            backgroundBar: "#ddd"
        }
    };

    @Input()
    className: string = "";
    @Input()
    theme: string = "primary";
    @Input()
    defaultBackgroundPrimary: boolean = false;
    @Input()
    height: number = 8;
    @Input()
    show: boolean = false;

    constructor() {}

    ngOnInit() {}
}
