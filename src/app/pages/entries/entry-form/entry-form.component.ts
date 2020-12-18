import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseResourceFormDirective } from './../../../shared/directives/base-resource-form/base-resource-form.directive';

import { EntryModel } from '../shared/models/entry.model';
import { CategoryModel } from './../../categories/shared/models/category.model';

import { EntryService } from '../shared/services/entry.service';
import { CategoryService } from '../../categories/shared/services/category.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormDirective<EntryModel> implements OnInit {

    categories: Array<CategoryModel>;

    imaskConfig = {
      mask: Number,
      scale: 2,
      thousandsSeparator: '',
      padFractionalZeros: true,
      nolmalizeZeros: true,
      radix: ','
    };

    ptBR = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    };

  constructor(
    protected entryService: EntryService,
    protected categoryService: CategoryService,
    protected injector: Injector
  ) {
    super(injector, new EntryModel(), entryService, EntryModel.fromJson);
  }

  ngOnInit(): void {
    this.loadCategories();
    super.ngOnInit();
  }

  get typeOptions(): Array<any>{
    return Object.entries(EntryModel.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        };
      }
    );
  }

  protected buildResourceForm(): any {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ['expense', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]]
    });
  }

  protected createPageTitle(): string {
    return 'Cadastro de Novo Lançamento';
  }

  protected editionPageTitle(): string {
    const resourceName = this.resource.name || '';
    return `Editando Lançamento: ${ resourceName }`;
  }

  private loadCategories(): any {
    this.categoryService.getAll()
    .subscribe(
      categories => this.categories = categories
    );
  }
}
