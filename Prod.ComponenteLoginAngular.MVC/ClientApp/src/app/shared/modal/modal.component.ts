import { Component, Directive, Injectable, Input, OnInit, TemplateRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ModalConfig } from 'src/app/interfaces/models/modalConfig'
// import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
@Injectable()
export class ModalComponent implements OnInit {
  @Input() public modalConfig: ModalConfig
  @ViewChild('modal') private modalContent: TemplateRef<ModalComponent>
  // private modalRef: NgbModalRef

  // constructor(private modalService: NgbModal) { }

  ngOnInit(): void { }

  open(): Promise<boolean> {

    return new Promise<boolean>(resolve => {
      // this.modalRef = this.modalService.open(this.modalContent)
      // this.modalRef.result.then(resolve, resolve)
    })
  }

  async close(): Promise<void> {
    if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
      const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose())
      // this.modalRef.close(result)
    }
  }

  async dismiss(): Promise<void> {
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss())
      // this.modalRef.dismiss(result)
    }
  }
}
