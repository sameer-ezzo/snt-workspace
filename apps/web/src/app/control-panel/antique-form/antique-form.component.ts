import { Component, Input, OnInit } from "@angular/core";
import { AntiqueModel, AuctionModel } from "@snt-workspace/models";
import { User } from "../../membership/auth.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import {
  Observable,
  combineLatest,
  filter,
  firstValueFrom,
  map,
  of,
  switchMap,
  tap,
} from "rxjs";
import { BaseDataService } from "../../client/services/base-data.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "apps/web/src/environments/environment";

@Component({
  selector: "antique-form",
  templateUrl: "./antique-form.component.html",
  styleUrls: ["./antique-form.component.scss"],
})
export class AntiqueFormComponent implements OnInit {
  private _terms$ = of<{ _id: string; parent?: string }[]>([
    { _id: "Antiques", parent: "category" },
    { _id: "Auctions", parent: "category" },
    { _id: "Victorian", parent: "tag" },
    { _id: "Century", parent: "tag" },
    { _id: "available", parent: "status" },
    { _id: "sold", parent: "status" },
  ]);
  categories$ = this._terms$.pipe(
    map((t) => t.filter((t) => t.parent === "category").map((t) => t._id))
  );
  tags$ = this._terms$.pipe(
    map((t) => t.filter((t) => t.parent === "tag").map((t) => t._id))
  );
  status$ = this._terms$.pipe(
    map((t) => t.filter((t) => t.parent === "status").map((t) => t._id))
  );
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  antiqueForm = this.formBuilder.group<any>({
    _id: [""],
    name: ["",[Validators.required, Validators.minLength(3)]],
    slug: [""],
    shortDescription: ["",[Validators.required]],
    description: ["",[Validators.required]],
    category: [""],
    tags: [[],],
    price: [0,[Validators.required]],
    currency: ["",[Validators.required]],
    dateOfManufacture: ["",[Validators.required]],
    status: ["",[Validators.required]],
    image: ["",[Validators.required]],
    images: ["",[Validators.required]],
  });

  private _item: AntiqueModel = new AntiqueModel();
  @Input()
  public get item(): AntiqueModel {
    return this._item;
  }
  public set item(value: AntiqueModel) {
    this._item = value;
    this.antiqueForm.patchValue(value as any);
  }
  changeFeatureImage(image: any){
    this.item.image = image;
  }
  changeImages(images: any): void {
    this.item.images = images;
  }

  changeCategory(cat: any) {
    this.item.category = cat;
  }

  changeTags(tags: any) {
    this.item.tags = tags;
  }

  ngOnInit() {}

  async save() {
    if (this.antiqueForm.invalid) return; // show message

    const formData = { ...this.antiqueForm.value } as any; 

    let result: any = null;

    const create = (data:Partial<AntiqueModel>)=> firstValueFrom(
      this.http.post(`${environment.base}/admin/antiques/create`, data)
    );
    const edit = (data:Partial<AntiqueModel>)=> firstValueFrom(
      this.http.post(`${environment.base}/admin/antiques/edit`, data)
    );

    try {
      this.loading = true;
      result = await (formData._id?.length === 0 ? create(formData) : edit(formData));

      const _id = result?._id as string;
      this.item = { ...formData, _id } as any;
    } catch (error) {
      // console.error(error);
    } finally {
      this.loading = false;
    }
  }
  setCategory(category: string[]) {
    console.log(category);
  }
  setTags(category: string[]) {
    console.log(category);
  }
}
