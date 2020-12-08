import { EntryModel } from './../shared/models/entry.model';
import { Component, OnInit } from '@angular/core';
import { EntryService } from '../shared/services/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: EntryModel[] = [];

  constructor(private serviceEntry: EntryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): any {
    this.serviceEntry.getAll().subscribe(
      result => this.entries = result.sort((a, b) => b.id - a.id),
      error => alert('Erro ao carregar os Lançamentos, tente novamente.')
    );
  }

  deleteEntry(entry: EntryModel): any {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      this.serviceEntry
        .delete(entry.id)
        .subscribe(
          () => this.entries = this.entries.filter(element => element !== entry),
          () => alert('Erro ao tentar excluir.')
        );
    }
  }
}
