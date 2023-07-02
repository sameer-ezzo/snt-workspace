import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, map, startWith } from 'rxjs'

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.scss']
})
export class ChipsInputComponent {
  separatorKeysCodes: number[] = [13, 188];
  selectedItems!: string[]
  itemCtrl = new FormControl('');
  filteredItems$!: Observable<string[]>;


  @ViewChild('itemInput') input!: ElementRef<HTMLInputElement>;
  @Output() valueChange = new EventEmitter<string | string[]>()
  _value: string[] = [];
  @Input()
  public get value(): undefined | string | string[] {
    if (!this.multiple) return this._value?.[0]
    return this._value
  }
  public set value(value: undefined | string | string[]) {
    if (!value) this._value = []
    else this._value = Array.isArray(value) ? value : [value];
  }

  @Input() label: string = ''
  @Input() multiple = false;
  @Input() items: string[] = [];



  constructor() {
    this.filteredItems$ = this.itemCtrl.valueChanges.pipe(
      debounceTime(250),
      startWith(''),
      map((item: string | null) => this._filter(item)),
    );
  }

  add(event: MatChipInputEvent): void {
    const item = (event.value || '').trim();

    if (item) {
      this._value = this.multiple ? [...this._value, item] : [item]
      this.valueChange.emit(this.value)
    }

    event.chipInput!.clear();

    this.input.nativeElement.value = '';
    this.itemCtrl.setValue('');
  }

  remove(item: string): void {
    const index = this._value.indexOf(item);
    if (index < 0) return

    this._value.splice(index, 1);
    this.itemCtrl.setValue(this.input.nativeElement.value);
    this.valueChange.emit(this.value)

  }

  selected(event: MatAutocompleteSelectedEvent): void {

    this._value = this.multiple ? [...this._value, event.option.viewValue] : [event.option.viewValue]


    this.input.nativeElement.value = '';
    this.itemCtrl.setValue('');
    this.valueChange.emit(this.value)
  }

  private _filter(value: string | null): string[] {
    const search = (value ?? '').toLowerCase();
    return this.items.filter(item => !this.value?.includes(item) && item.toLowerCase().includes(search));
  }
}


























