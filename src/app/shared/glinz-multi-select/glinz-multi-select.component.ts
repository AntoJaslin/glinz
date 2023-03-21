import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-glinz-multi-select',
  templateUrl: './glinz-multi-select.component.html',
  styleUrls: ['./glinz-multi-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlinzMultiSelectComponent {

  @Input() list!: any[];

  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();
  
  showDropDown: any = false;

  checkedList: any[];
  currentSelected!: {};

  constructor() {
    this.checkedList = [];
  }

  getSelectedValue(status: Boolean, value: String) {
    if (status) {
      this.checkedList.push(value);
    } else {
      var index = this.checkedList.indexOf(value);
      this.checkedList.splice(index, 1);
    }

    this.currentSelected = { checked: status, name: value };

    //share checked list
    this.shareCheckedlist();

    //share individual selected item
    this.shareIndividualStatus();
  }
  shareCheckedlist() {
    this.shareCheckedList.emit(this.checkedList);
  }
  shareIndividualStatus() {
    this.shareIndividualCheckedList.emit(this.currentSelected);
  }



}