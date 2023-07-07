import { Component, Input, OnInit } from '@angular/core';
import { AntiqueModel, AuctionModel } from '@snt-workspace/models';
import { User } from '../../membership/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject, combineLatest, debounceTime, filter, firstValueFrom, map, of, startWith, switchMap, tap } from 'rxjs';
import { BaseDataService } from '../../client/services/base-data.service';
import { DataService } from '../../shared/data.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'apps/web/src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  loading = false;


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private ds: BaseDataService,
    private http: HttpClient,
    private snackbar: MatSnackBar

  ) { }

  private _item: AuctionModel = new AuctionModel();
 
  @Input()
  
  public get item(): AuctionModel {
    return this._item;
  }
  public set item(value: AuctionModel) {
    this._item = value;
    this.auctionForm.patchValue(value as any)
  }
   
  antiqueControl = new FormControl();

  auctionForm = this.formBuilder.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    slug: ['',[Validators.required]],
    antique: [{_id: '', name: ''},[Validators.required]],
    shortDescription: ['',[Validators.required]],
    description: ['',[Validators.required]],
    status: ['',[Validators.required]],
    category: [''],
    tags: [[]],

    startingPrice: [0,[Validators.required]],
    openDate: ['',[Validators.required]],
    closeDate: ['',[Validators.required]],

    contact: this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(3)]],
      phone: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
    }),
    image: [[], [Validators.required]],
    address: ['',[Validators.required]],
    map: ['']
  });
  changeFeatureImage(image: any){
    this.item.image = image;
  }

  changeCategory(cat: any) {
    this.item.category = cat
  }



  changeTags(tags: any) {
    this.item.tags = tags
  }

  setAntiqueValue(value: any){
    this.item.antique = value
  }

  async save() {
    if (this.auctionForm.invalid) return;
     const formData = { ...this.auctionForm.value } as any; 

    let result: any = null;

    const create = (data:Partial<AuctionModel>)=> firstValueFrom(
      this.http.post(`${environment.base}/admin/auctions/create`, data)
    );
    const edit = (data:Partial<AntiqueModel>)=> firstValueFrom(
      this.http.post(`${environment.base}/admin/auctions/edit`, data)
    );

    try {
      this.loading = true;
      result = await (formData._id?.length === 0 ? create(formData) : edit(formData));

      const _id = result?._id as string;
      this.item = { ...formData, _id } as any;
    } catch (error:any) {
      if(error.name === 'HttpErrorResponse') this.snackbar.open(error.error.message, 'Close',{panelClass: ['snackbar-error']})
      else this.snackbar.open('Error has been happened', 'Close',{panelClass: ['snackbar-error']})
      
    } finally {
      this.loading = false;
    }
    
  }





  filteredAntiques$!: Observable<AntiqueSelectViewModel[]>;
  ngOnInit() {
    this.filteredAntiques$ = this.auctionForm.controls.antique.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      switchMap((value: any) => this._filter(value ?? '')),
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
