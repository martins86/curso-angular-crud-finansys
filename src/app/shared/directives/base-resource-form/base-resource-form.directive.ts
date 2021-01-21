import { OnInit, AfterContentChecked, Injector, Directive } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';

import { BaseResourceModel } from '../../models/base-resource-model';

import { BaseResourceService } from '../../services/base-resource.service';

@Directive({ })
export abstract class BaseResourceFormDirective<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

    currentAction: string;
    resourceForm: FormGroup;
    pageTitle: string;
    serverErrorMessages: string[] = null;
    submittingForm = false;

    protected route: ActivatedRoute;
    protected router: Router;
    protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked(): void {
    this.setTitlePage();
  }

  submitForm(): void {
    this.submittingForm = true;
    if (this.currentAction === 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }
  }

  protected abstract buildResourceForm(): void;

  protected setCurrentAction(): any {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  protected loadResource(): any {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(+params.get('id')))
      )
      .subscribe(
        (resource) => {
          this.resource = resource;
          this.resourceForm.patchValue(resource);
        },
        (error) => alert('Ocorreu um erro no servidor, temte mais tarde.')
      );
    }
  }

  protected setTitlePage(): any {
    if (this.currentAction === 'new') {
      this.pageTitle = this.createPageTitle();
    } else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected createPageTitle(): string {
    return 'Novo';
  }

  protected editionPageTitle(): string {
    return 'Edição';
  }

  protected createResource(): any {
    const newResource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.create(newResource)
      .subscribe(
        resource => this.actionsForSuccess(resource),
        error => this.actionsForError(error)
      );
  }

  protected updateResource(): any {
    const upResource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.update(upResource)
      .subscribe(
        resource => this.actionsForSuccess(resource),
        error => this.actionsForError(error)
      );
  }

  protected actionsForSuccess(resource: T): void {
    toastr.success('Solicitação processada com sucesso!');

    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
      () => this.router.navigate([baseComponentPath])
    );
  }

  protected actionsForError(error): void {
    toastr.error('Erro ao processar a sua solicitação!');
    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor, Por Favor, tente novamente.'];
    }
  }
}
