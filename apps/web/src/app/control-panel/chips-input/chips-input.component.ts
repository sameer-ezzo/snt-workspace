import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, inject} from '@angular/core';
import { FormControl} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs'
import {LiveAnnouncer} from '@angular/cdk/a11y';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.scss']
})
export class ChipsInputComponent{
  
  @Input() labelText: string = ''
  @Input() type: 'single' | 'multiple' = 'multiple';
  @Input() items: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4']; 

  separatorKeysCodes: number[] = [13, 188];
  selectedItems!: string[]

  itemCtrl = new FormControl();
  filteredItems$!: Observable<string[]>;

  @ViewChild('Input') Input!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  ngOnInit() {
    this.filteredItems$ = this.itemCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => item ? this._filter(item) : this.items.slice())
    );
  }

  addItem(event: MatAutocompleteSelectedEvent): void {
    
    const value = (event.option.value || '').trim();
    console.log(value);

    if (value && this.items.includes(value) && !this.selectedItems.includes(value)) {
      if(this.type === 'single') {
        this.selectedItems = [value];
        return
      }
      this.selectedItems.push(value);
    }

    this.itemCtrl.setValue(null);
  }
  setValues(){
    this.Input
  }
  removeItem(item: string): void {
    const index = this.selectedItems.indexOf(item);

    if (index >= 0) {
      this.selectedItems.splice(index, 1);
      this.announcer.announce(`Removed ${item}`);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.items.push(event.option.viewValue);
    this.Input.nativeElement.value = '';
    this.itemCtrl.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.items.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  }
}
  

 

   

  

  


   



   

  


  

 



