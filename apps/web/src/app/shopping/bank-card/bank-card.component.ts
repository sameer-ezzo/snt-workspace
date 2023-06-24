import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'snt-bank-card',
  templateUrl: './bank-card.component.html',
  styleUrls: ['./bank-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BankCardComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      creditCard: [],
      creditCardDate: [],
      creditCardCvv: [],
    });

  }
}
