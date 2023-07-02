import { Component, Input, OnInit } from '@angular/core';
import { AntiqueModel, AuctionModel } from '@snt-workspace/models';
import { User } from '../../membership/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, filter, map, of, switchMap, tap } from 'rxjs';
import { BaseDataService } from '../../client/services/base-data.service';

@Component({
  selector: 'antique-form',
  templateUrl: './antique-form.component.html',
  styleUrls: ['./antique-form.component.scss']
})
export class AntiqueFormComponent implements OnInit {


  private _terms$ = of<{ _id: string, parent?: string }[]>([
    { _id: 'Antiques', parent: 'category' },
    { _id: 'Auctions', parent: 'category' },
    { _id: 'Victorian', parent: 'tag' },
    { _id: 'Century', parent: 'tag' }
  ])
  categories$ = this._terms$.pipe(map(t => t.filter(t => t.parent === 'category').map(t => t._id)))
  tags$ = this._terms$.pipe(map(t => t.filter(t => t.parent === 'tag').map(t => t._id)))

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private ds: BaseDataService,
  ) { }

  @Input() item!: AntiqueModel

  antiqueForm = this.formBuilder.group({
    name: [''],
    slug: [''],
    shortDescription: [''],
    description: [''],
    price: [0],
    currency: [''],
    dateOfManufacture: [''],
    status: [''],
    images: ['']
  });


  changeCategory(cat: any) {
    this.item.category = cat
  }
  
  changeTags(tags: any) {
    this.item.tags = tags
  }

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
