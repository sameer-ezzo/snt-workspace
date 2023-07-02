import { Component, Input, OnInit } from '@angular/core';
import { AntiqueModel, AuctionModel } from '@snt-workspace/models';
import { User } from '../../membership/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map, switchMap, tap } from 'rxjs';
import { BaseDataService } from '../../client/services/base-data.service';

@Component({
  selector: 'antique-form',
  templateUrl: './antique-form.component.html',
  styleUrls: ['./antique-form.component.scss']
})
export class AntiqueFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
     private route: ActivatedRoute,
     private ds: BaseDataService,
     ) {}

  @Input() item!: AntiqueModel
 
  antiqueForm = this.formBuilder.group({
    name: [''],
    slug:[''],
    shortDescription: [''],
    description: [''],
    price:[0],
    currency: [''],
    dateOfManufacture: [''],
    status: [''],
    images: ['']
});


  ngOnInit() {
  }
  
  save() {
    if (this.antiqueForm.valid) {
      console.log('Save item:');
    }
  }
 setCategory(category: string[]) {
  console.log(category);
  
 }
 setTags(category: string[]) {
  console.log(category);
  
 }

}
