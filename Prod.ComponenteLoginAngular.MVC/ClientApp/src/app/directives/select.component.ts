import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import axios from 'axios';

const TEMPLATE = `
<div [ngClass]="{'input-group': loading}">
    <select class="form-control" [(ngModel)]="Model" (ngModelChange)="handleChange()" [disabled]="disabled||loading">
        <option *ngIf="setDefaultOptionText" [ngValue]="null">{{defaultOptionText}}</option>
        <option *ngFor="let item of items" [ngValue]="asObject||!item.hasOwnProperty(bindValue)?item:item[bindValue]">{{ item[bindLabel]?item[bindLabel]:item}}</option>
    </select>
    <span class="input-group-addon spinner" *ngIf="loading">
        <i class="fa fa-circle-o-notch fa-spin"></i>
    </span>
</div>
    `;

@Component({
    selector: 'app-select',
    template: TEMPLATE,
    styles: [`
            .spinner { border: none; background: none; color: #dc3545; font-size: 20px;}
    `]
})
export class SelectComponent implements OnInit, OnChanges {
    @Input() items?: Array<any> = [];
    @Input() bindValue?: string = 'value';
    @Input() bindLabel?: string = 'label';
    @Input() asObject?: Boolean = false;
    @Input() url?: string;
    @Input() responseField?: string;
    @Input() Model?: any;
    @Output() ModelChange = new EventEmitter();
    @Input() disabled: Boolean = false;
    @Input() defaultOptionText: string = '--Seleccionar--';
    @Input() setDefaultOptionText?: Boolean = true;

    loading: Boolean = false;

    constructor() {}

    ngOnInit() {
        this.getItems();
    }

    getItems = async () => {
        if (this.url) {
            try {
                this.loading = true;
                const resp = await axios.get(this.url);
                this.loading = false;
                if (this.responseField) { this.items = resp.data[this.responseField]; }
                else { this.items = resp.data; }
                if (this.asObject && this.Model != null) {
                    this.Model = this.items.find(
                        x => x[this.bindValue] === this.Model[this.bindValue]
                    );
                }
            } catch (error) {}
        }
    }

    ngOnChanges(changes): void {
        if (this.asObject && this.Model != null) {
            const newValue = this.items.find(
                x => x[this.bindValue] === changes.Model.currentValue[this.bindValue]
            );
            if (newValue !== undefined) { this.Model = newValue; }
        }
    }

    handleChange = () => {
        this.ModelChange.emit(this.Model);
    }
}
