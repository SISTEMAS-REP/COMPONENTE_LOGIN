import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { HeaderButton } from '../../interfaces/header-button';
import { LimitOptions } from '../../interfaces/limit-options';
import { TableButton } from '../../interfaces/table-button';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
  TableColumn,
  TableColumnProp,
} from '@siemens/ngx-datatable';

@Component({
  selector: 'app-custom-datatable',
  templateUrl: './custom-datatable.component.html',
  styles: [],
})
export class CustomDatatableComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: true }) table!: DatatableComponent;

  @Output() onSendAllSelected: EventEmitter<any> = new EventEmitter();
  @Output() onSendLastSelected: EventEmitter<any> = new EventEmitter();
  @Output() onSendClickButton: EventEmitter<any> = new EventEmitter();

  @Output() onSendClickTableButton: EventEmitter<any> = new EventEmitter();

  @Input() loaderName: string = 'custom-datatable';
  @Input() headerTitle: string = 'Listado';
  @Input() showHeader: boolean = true;

  @Input() headerButtons: HeaderButton[] = [];
  @Input() tableButtons: TableButton[] = [];

  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() showScrollBarH: boolean = true;
  @Input() showOptions: boolean = true;
  @Input() limitOptions: LimitOptions[] = [
    {
      name: '10',
      value: 10,
    },
    {
      name: '50',
      value: 50,
    },
    {
      name: '100',
      value: 100,
    },
    {
      name: 'Todos',
      value: -1,
    },
  ];
  @Input() showSearch: boolean = true;
  @Input() selectionType: SelectionType = SelectionType.checkbox;
  @Input() columnMode: ColumnMode = ColumnMode.force;
  @Input() showSummaryRow: boolean = false;

  tempData: any[] = [];
  allSelected: any[] = [];
  lastSelected?: any;

  totalSize: number = 0;
  pageSize: number = this.limitOptions[0]?.value ?? 10;
  currentPage: number = 1;
  searchInput: string = '';
  messages = { emptyMessage: 'No hay registros para listar' };

  constructor() {}

  ngOnInit(): void {}

  isCheckBoxType() {
    return this.selectionType == SelectionType.checkbox;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.allSelected = [];
      this.lastSelected = undefined;
      this.searchInput = '';
      this.updateData();
    }
  }

  updateData() {
    this.tempData = this.data.map((prop, key) => {
      return {
        ...prop,
        id: key,
      };
    });

    this.totalSize = this.data.length;
    if (this.data.length > 0) {
      this.table.sorts = [];
      this.setPage(1);
    }
  }

  formatSummaryColum(prop?: TableColumnProp) {
    return prop == 'deImporteCalculado';
  }

  setPage(pageNum: number) {
    this.currentPage = pageNum;
    this.table.offset = pageNum - 1;
  }

  sort(event: any) {
    this.setPage(1);
  }

  setPageSize(event: any) {
    this.table.limit = event != -1 ? event : undefined;
    this.setPage(1);
  }

  search($event: any) {
    let val = $event.target.value;
    this.tempData = this.data.filter(function (data: any) {
      for (var key in data) {
        if (data[key].toString().toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  clickHeaderButton($event: any) {
    if ($event && $event.action) {
      (this[$event.action as keyof CustomDatatableComponent] as Function)(
        $event.name
      );
    } else {
      this.onSendClickButton.emit();
    }
  }

  sendAllSelected($name?: any) {
    this.onSendAllSelected.emit({ name: $name, data: this.allSelected });
  }

  sendLastSelected($name?: any) {
    this.onSendLastSelected.emit({ name: $name, data: this.lastSelected });
  }

  setSelectedItem({ selected }: any) {
    this.allSelected.splice(0, this.allSelected.length);
    this.allSelected.push(...selected);

    this.lastSelected = selected[0];

    if (!this.isCheckBoxType()) {
      this.sendLastSelected();
    }
  }

  clickTableButton($name: any, $row: any) {
    this.onSendClickTableButton.emit({ name: $name, data: $row });
  }

  evalCondition($row: any, $tableButton: any) {
    if ($tableButton.conditionValue && $tableButton.conditionOperator) {
      return eval(
        `${$row[$tableButton.conditionValue]}${$tableButton.conditionOperator}`
      );
    }

    return true;
    /*return $event[$action.conditionValue] === 0;
    //row[tableButton.conditionValue] === 0*/
  }

  /*getCellClass = ({ row, column, value }: any): any => {
    //console.log(column);
    return {
      'text-right': this.rightAlignedCells?.includes(column.prop),
    };
  };*/
}
