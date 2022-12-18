import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AntiqueModel, AuctionModel } from 'libs/models/src';
@Component({
  selector: 'snt-workspace-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent{

  constructor(private fb: FormBuilder) { }

    ngOnInit() {
      this.form = this.fb.group({
        creditCard: [],
        creditCardDate: [],
        creditCardCvv: [],
      });

}
