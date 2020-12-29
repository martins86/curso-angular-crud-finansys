import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { ChartModule } from 'primeng/chart';

import { ReportsRoutingModule } from './reports-routing.module';

import { ReportViewComponent } from './report-view/report-view.component';


@NgModule({
  declarations: [ReportViewComponent],
  imports: [
    SharedModule,
    ChartModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
