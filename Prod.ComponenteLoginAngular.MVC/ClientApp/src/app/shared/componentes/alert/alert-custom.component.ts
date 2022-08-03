import {
    Component,
    OnInit,
    OnChanges,
    Input,
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentFactory
} from "@angular/core";

@Component({
    selector: "app-alert-custom",
    template: `
        <template #itemContainer></template>
    `
})
export class AlertCustomComponent implements OnInit, OnChanges {
    @Input()
    definition: any;
    componentRef: any;

    @ViewChild("itemContainer", { read: ViewContainerRef })
    entry: ViewContainerRef;
    constructor(private resolver: ComponentFactoryResolver) {}

    createComponent(): void {
        this.entry.clear();

        const { component, ...props } = this.definition;

        const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
        this.componentRef = this.entry.createComponent(factory);

        Object.keys(props).forEach(i => {
            this.componentRef.instance[i] = props[i];
        });
    }

    ngOnInit() {
        this.createComponent();
    }

    updateComponent = () => {
        if (this.componentRef) {
            const { component, ...props } = this.definition;

            Object.keys(props).forEach(i => {
                this.componentRef.instance[i] = props[i];
            });
        }
    };

    ngOnChanges(): void {
        this.updateComponent();
    }

    destroyComponent(): void {
        this.componentRef.destroy();
    }
}
