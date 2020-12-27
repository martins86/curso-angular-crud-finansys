import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { ReportsRoutingModule } from './reports-routing.module';

import { ReportViewComponent } from './report-view/report-view.component';


@NgModule({
  declarations: [ReportViewComponent],
  imports: [
    SharedModule,
    ReportsRoutingModule
  ],
  exports: [ReportViewComponent]
})
export class ReportsModule { }
