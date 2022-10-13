export interface TableButton {
  name: string;
  tooltip?: string;
  class: string; // fas fa-solid fa-pen text-red
  icon?: string;
  action?: any;
  conditionValue?: any;
  conditionOperator?: any;
}
