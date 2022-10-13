import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeaderButton } from '../../interfaces/header-button';
import { CustomButton } from '../../interfaces/custom-button';

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styles: [],
})
export class HeaderCardComponent implements OnInit {
  @Input() headerTitle: string = '';
  @Input() refreshButton?: CustomButton;
  @Input() buttons: HeaderButton[] = [];
  @Output() onSendActionButton: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  showTitle() {
    return this.headerTitle.trim() !== '';
  }

  showButtons() {
    return this.buttons.length > 0;
  }

  setActionButton($name: any, $action: any) {
    this.onSendActionButton.emit({ name: $name, action: $action });
  }

  setClassButton($class: string): string {
    return `btn btn-${$class}`;
  }

  setIconButton($icon?: string): string {
    const icon = $icon ?? 'user';
    return `fas fa-${icon}`;
  }
}
