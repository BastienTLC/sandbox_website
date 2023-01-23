import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VilleModel } from '../ville.model';
import { PhotoSearchService } from './photoSearch.service'
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class CardComponent {
  @Input() ville: VilleModel | undefined;
  @Input() listville: VilleModel[] | undefined;
  @Output() notify = new EventEmitter();
  images = [];
  constructor(private photoSearch: PhotoSearchService) { }
  ngOnInit() {
    if (this.ville)
      this.photoSearch.search("city "+this.ville?.ville).subscribe(data => {
        this.images = data.hits;
        console.log(this.images[0]["previewURL"]);
      });
  }

  flip: string = 'inactive';
  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
    console.log(this.flip);
  }

}
