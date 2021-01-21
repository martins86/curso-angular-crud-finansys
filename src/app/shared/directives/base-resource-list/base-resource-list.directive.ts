import { OnInit, Injector, Directive } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource-model';

import { BaseResourceService } from '../../services/base-resource.service';

@Directive({ })
export abstract class BaseResourceListDirective<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  constructor(private resourceService: BaseResourceService<T>) { }

  ngOnInit(): void {
    this.getAllResources();
  }

  protected getAllResources(): any {
    this.resourceService.getAll().subscribe(
      result => this.resources = result.sort((a, b) => b.id - a.id),
      error => alert('Erro ao carregar os Lançamentos, tente novamente.')
    );
  }

  deleteResource(resource: T): any {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      this.resourceService
        .delete(resource.id)
        .subscribe(
          () => this.resources = this.resources.filter(element => element !== resource),
          () => alert('Erro ao tentar excluir.')
        );
    }
  }
}
