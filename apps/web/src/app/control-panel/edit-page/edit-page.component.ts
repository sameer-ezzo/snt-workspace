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
import { Observable, combineLatest, map, of, switchMap, tap } from "rxjs";
import { BaseDataService } from "../../client/services/base-data.service";

@Component({
  selector: "snt-edit-page",
  templateUrl: "./edit-page.component.html",
  styleUrls: ["./edit-page.component.scss"],
})
export class EditPageComponent {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private ds: BaseDataService
  ) {}

  item!: any;
  itemType$ = this.route.params.pipe(map((params) => params["collection"]));
  slug$ = this.route.params.pipe(map((params) => params["slug"]));
  _item$ = combineLatest([this.slug$, this.itemType$]).pipe(
    switchMap(([slug, type]) => {
      if (slug?.length > 0)
        return this.ds.get(type, { page: 1, per_page: 1, slug: slug });

      const item =
        type === "antiques" ? new AntiqueModel() : new AuctionModel();
      return of({ data: [item] });
    }),
    map((res) => res.data?.[0] as any),
    tap((item) => (this.item = item))
  );
 
}
