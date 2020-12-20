import { Component, Input } from '@angular/core';

import { BreadCrumbModel } from './shared/models/bread-crumb.model';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent {
  @Input() items: Array<BreadCrumbModel> = [];

  isTheLastItem(item: BreadCrumbModel): boolean {
    const index = this.items.indexOf(item);
    return index + 1 === this.items.length;
  }

}
