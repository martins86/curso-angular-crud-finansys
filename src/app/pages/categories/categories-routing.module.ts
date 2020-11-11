import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CateroryListComponent} from './../categories/caterory-list/caterory-list.component';
import { CateroryFormComponent } from './../categories/caterory-form/caterory-form.component';


const routes: Routes = [
  { path: '', component: CateroryListComponent },        // url: categories/
  { path: 'new', component: CateroryFormComponent},      // url: categories/new
  { path: ':id/edit', component: CateroryFormComponent}, // url: categories/{:id}/edit
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
