import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AntiquesService } from '../services/antiques.service';
import { AntiqueModel } from '../services/base-data.service';


@Component({
  selector: 'snt-workspace-antique-page',
  templateUrl: './antique-page.component.html',
  styleUrls: ['./antique-page.component.scss'],
  host: { class: 'container' }
})
export class AntiquePageComponent implements OnInit {
  antique: AntiqueModel | undefined
  relatedITems = []

  constructor(private route: ActivatedRoute, private ds: AntiquesService) { }

  async ngOnInit(): Promise<void> {
    const slug = this.route.snapshot.params['slug'] as string
    if (!slug) throw new Error("No slug provided")
    this.antique = await this.ds.getBySlug(slug)
    this.relatedITems = await this.ds.get(1)
  }

}
