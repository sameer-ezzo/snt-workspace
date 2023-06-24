import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'snt-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  host:{class: 'container'}
})
export class ListPageComponent  {

  collection$ = this.route.data.pipe(map((x: any & { collection: 'antiques' | 'auctions' }) => x.collection))

  constructor(private route: ActivatedRoute) { }
}
