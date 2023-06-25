import { Component, Input, OnInit } from '@angular/core';
import { AntiqueModel, AuctionModel } from '@snt-workspace/models';
import { User } from '../../membership/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map, switchMap, tap } from 'rxjs';
import { BaseDataService } from '../../client/services/base-data.service';

@Component({
  selector: 'snt-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
     private route: ActivatedRoute,
     private ds: BaseDataService,
     ) {}

  item!: any
  itemType$ = this.route.params.pipe(map(params => params['collection']))
  slug$ = this.route.params.pipe(map(params =>params['slug']))
  _item$ = combineLatest([this.slug$,this.itemType$]).pipe(
    switchMap(([slug, type]) => {
      return this.ds.get(type, { page: 1, per_page: 1, slug: slug })
    })
    ,map(res => res.data.shift() as any),
    tap(item => this.item = item)
  )
  // item$: Observable<any> = this.route.params.pipe(
  //   map(params => params['slug']),
  
  //   switchMap(slug => this.ds.get<AuctionModel>('auctions', {
  //     page: 1,
  //     per_page: 1,
  //     // select: '_id,name,slug,image,shortDescription,category',
  //     slug,
  //     lookup: {
  //       from: 'antiques',
  //       lf: 'antique.aid', ff: '_id', as: 'item',
  //       first: true
  //     }
  //   }
  //   )),
  //   map(res => res.data.shift() as any),
  //   map(auction => ({
  //     ...auction,
  //     antique: auction.item,
  //     item: undefined, url: document.location.href
  //   })),
  //   tap(auction => this.auction = auction)
  // )
  antiqueForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    slug: new FormControl(''),
    shortDescription: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    tags: new FormControl(''),
    price: new FormControl(''),
    currency: new FormControl(''),
    dateOfManufacture: new FormControl(''),
    status: new FormControl(''),
    images: new FormControl('')
});


  ngOnInit() {
  }
  
  save() {
    if (this.antiqueForm.valid) {
      console.log('Save item:');
    }
  }
 

}
