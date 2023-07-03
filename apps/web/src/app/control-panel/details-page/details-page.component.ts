import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CartService } from "../../shared/cart.service";
import { BaseDataService } from "../../client/services/base-data.service";
import { MatDialog } from "@angular/material/dialog";
import { Observable, ReplaySubject, map, switchMap, tap } from "rxjs";
import { async } from "@angular/core/testing";

@Component({
  selector: "snt-details-page",
  templateUrl: "./details-page.component.html",
  styleUrls: ["./details-page.component.scss"],
})
export class DetailsPageComponent implements OnInit {
  slug$: ReplaySubject<"auctions" | "antiques"> = new ReplaySubject(1);
  item$: Observable<any> = this.route.params.pipe(
    switchMap((params) => {
      const { slug, collection } = params;
      this.slug$.next(collection);
      console.log(slug);

      if (collection === "auctions") {
        return this.ds.get<any>(collection, {
          page: 1,
          per_page: 1,
          slug,
          lookup: {
            from: "antiques",
            lf: "antique.aid",
            ff: "_id",
            as: "item",
            first: true,
          },
        });
      } else {
        return this.ds.get<any>(collection, {
          page: 1,
          per_page: 1,
          slug,
        });
      }
    }
    ),
    map((res) => (Array.isArray(res.data) ? res.data.shift() : res.data)),
    map((item) => ({
      ...item,
      antique: item?.item,
      item: undefined,
      url: document.location.href,
    }))
  );

  constructor(
    private route: ActivatedRoute,
    private cart: CartService,
    private router: Router,
    private ds: BaseDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}
}
