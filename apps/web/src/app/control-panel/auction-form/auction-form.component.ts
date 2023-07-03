import { Component, Input, OnInit } from '@angular/core';
import { AntiqueModel, AuctionModel } from '@snt-workspace/models';
import { User } from '../../membership/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject, combineLatest, debounceTime, filter, map, of, startWith, switchMap, tap } from 'rxjs';
import { BaseDataService } from '../../client/services/base-data.service';
import { DataService } from '../../shared/data.service';


export type AntiqueSelectViewModel = { _id: string, name: string }
@Component({
  selector: 'auction-form',
  templateUrl: './auction-form.component.html',
  styleUrls: ['./auction-form.component.scss']
})
export class AuctionFormComponent implements OnInit {


  private _terms$ = of<{ _id: string, parent?: string }[]>([
    { _id: 'Antiques', parent: 'category' },
    { _id: 'Auctions', parent: 'category' },
    { _id: 'Victorian', parent: 'tag' },
    { _id: 'Century', parent: 'tag' },
    { _id: 'available', parent: 'status' },
    { _id: 'sold', parent: 'status' },
  ])
  categories$ = this._terms$.pipe(map(t => t.filter(t => t.parent === 'category').map(t => t._id)))
  tags$ = this._terms$.pipe(map(t => t.filter(t => t.parent === 'tag').map(t => t._id)))
  status$ = this._terms$.pipe(map(t => t.filter(t => t.parent === 'tag').map(t => t._id)))


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private ds: BaseDataService,
    private dataService: DataService
  ) { }
  
  @Input() item: AuctionModel = new AuctionModel()
  antiqueControl = new FormControl();

  auctionForm = this.formBuilder.group({
    name: [''],
    slug: [''],
    antique: [{_id: '', name: ''}],
    shortDescription: [''],
    description: [''],
    status: [''],
    category: [''],
    tags: [[]],

    startingPrice: [''],
    openDate: [''],
    closeDate: [''],

    contact: this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    }),

    address: [''],
    map: [''],
  });

  changeCategory(cat: any) {
    this.item.category = cat
  }



  changeTags(tags: any) {
    this.item.tags = tags
  }



  save() {
    if (this.auctionForm.valid) {
      console.log('Save item:');
    }
  }





  filteredAntiques$!: Observable<AntiqueSelectViewModel[]>;
  ngOnInit() {
    this.filteredAntiques$ = this.auctionForm.controls.antique.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      switchMap(value => this._filter(value ?? '')),
    );
  }

  private _filter(value: string): Observable<AntiqueSelectViewModel[]> {
    // const filterValue = value.toLowerCase();
    return this.ds.get$('antiques', {
      page: 1,
      per_page: 10,
      select: '_id,name',
      '$icontains': `name:${value}`
    }).pipe(map((res: any) => res.data))
  }
}
