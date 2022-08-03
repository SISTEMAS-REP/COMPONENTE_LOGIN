import { Component, OnInit, Input, OnDestroy, ElementRef } from "@angular/core";

/*declare global {
    interface Window {
        modalZIndex: any;
    }
}

window.modalZIndex = 1030;*/

@Component({
    selector: "app-modal-envelope",
    templateUrl: "./modal-envelope.component.html",
    styles: [``]
})
export class ModalEnvelopeComponent implements OnInit, OnDestroy {
    
    @Input("modal-title")
    title?: string;
    @Input()
    loading?: Boolean = false;
    @Input()
    onClose?: Function;
    @Input("header")
    header?: Boolean = true;
    @Input("footer")
    footer?: Boolean = true;
    @Input()
    size?: string;
    @Input()
    _isModalUpload: boolean = false;
    @Input() 
    visibleVisor: boolean = false;
    @Input()
    idGestorArchivo: string;

    wrapper: any = null;

    constructor(private elRef: ElementRef) {
        const div = document.createElement("div");
        div.setAttribute(
            "style",
            `position: fixed; 
            width: 100%;
            height: 100%; 
            top: 0; 
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.5); 
            z-index: 1000;
            cursor: pointer;`
        );
        div.setAttribute("class", "modal-backdrop in");
        //window.modalZIndex += 10;
        //div.style.zIndex = "" + window.modalZIndex;
        this.wrapper = document.body.appendChild(div);
    }

    ngOnInit() {}

    ngOnDestroy(): void {
        
        document.body.removeChild(this.wrapper);
    }

    handleClose = () => {
        if (!this.loading) this.onClose();
    };

    handleExternalLink = () => {
        if (!this.loading) window.open(`/Visor/Pdf/${this.idGestorArchivo}`, "_blank");
    }
}
