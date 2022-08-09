import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AntiqueModel } from 'libs/models/src';
import { BaseDataService } from '../services/base-data.service';


@Component({
  selector: 'snt-workspace-antique-page',
  templateUrl: './antique-page.component.html',
  styleUrls: ['./antique-page.component.scss'],
  host: { class: 'container' }
})
export class AntiquePageComponent implements OnInit {
  antique: AntiqueModel | undefined | null
  relatedITems: AntiqueModel[] = []

  constructor(private route: ActivatedRoute, private ds: BaseDataService) { }

  async ngOnInit(): Promise<void> {
    const slug = this.route.snapshot.params['slug'] as string
    if (!slug) throw new Error("No slug provided")
    this.antique = await this.ds.find('antiques', slug)
    this.relatedITems = (await this.ds.get<AntiqueModel>('antiques', 1)).data
  }

}
