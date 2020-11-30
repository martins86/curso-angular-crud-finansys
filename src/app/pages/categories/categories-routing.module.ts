import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryListComponent} from './../categories/category-list/category-list.component';
import { CategoryFormComponent } from './../categories/category-form/category-form.component';


const routes: Routes = [
  { path: '', component: CategoryListComponent },        // url: categories/
  { path: 'new', component: CategoryFormComponent},      // url: categories/new
  { path: ':id/edit', component: CategoryFormComponent}, // url: categories/{:id}/edit
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
