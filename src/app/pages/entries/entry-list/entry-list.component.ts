import { Component } from '@angular/core';

import { BaseResourceListDirective } from 'src/app/shared/directives/base-resource-list/base-resource-list.directive';

import { EntryModel } from './../shared/models/entry.model';

import { EntryService } from '../shared/services/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent extends BaseResourceListDirective<EntryModel> {

  constructor(private entryService: EntryService) {
    super(entryService);
  }
}
