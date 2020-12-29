import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import currencyFormatter from 'currency-formatter';

import { EntryModel } from './../../entries/shared/models/entry.model';
import { CategoryModel } from './../../categories/shared/models/category.model';

import { EntryService } from '../../entries/shared/services/entry.service';
import { CategoryService } from '../../categories/shared/services/category.service';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit {
  months = [
    {value: 1, text: 'Janeiro'},
    {value: 2, text: 'Fevereiro'},
    {value: 3, text: 'Março'},
    {value: 4, text: 'Abril'},
    {value: 5, text: 'Maio'},
    {value: 6, text: 'Junho'},
    {value: 7, text: 'Julho'},
    {value: 8, text: 'Agosto'},
    {value: 9, text: 'Setembro'},
    {value: 10, text: 'Outubro'},
    {value: 11, text: 'Novembro'},
    {value: 12, text: 'Dezembro'}
  ];

  years = [
    {value: 2015, text: '2015'},
    {value: 2016, text: '2016'},
    {value: 2017, text: '2017'},
    {value: 2018, text: '2018'},
    {value: 2019, text: '2019'},
    {value: 2020, text: '2020'},
    {value: 2021, text: '2021'}
  ];

  expenseTotal = 0;
  revenueTotal = 0;
  balance = 0;

  expenseChartData: any;
  revenueChartData: any;

  chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  categories: CategoryModel[] = [];
  entries: EntryModel[] = [];

  @ViewChild('month') month: ElementRef = null;
  @ViewChild('year') year: ElementRef = null;

  constructor(
    private entryService: EntryService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll()
      .subscribe(categories => this.categories = categories);
  }

  generateReports(): void {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if (!month || !year) {
      alert('Você precisa informar um Mês e um Ano para gerar o relatório.');
    } else {
      this.entryService.getByMonthAndYear(month, year).subscribe(this.setValues.bind(this));
    }
  }

  private setValues(entries: EntryModel[]): void {
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance(): void {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {
      if (entry.type === 'revenue') {
        revenueTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL' });
      } else {
        expenseTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL' });
      }
    });

    this.expenseTotal = currencyFormatter.format(expenseTotal, { code: 'BRL' });
    this.revenueTotal = currencyFormatter.format(revenueTotal, { code: 'BRL' });
    this.balance = currencyFormatter.format(revenueTotal - expenseTotal, { code: 'BRL' });
  }

  private setChartData(): void {
    this.revenueChartData = this.getChartData('revenue', 'Gráfico de Receitas', '#9CCC65');
    this.expenseChartData = this.getChartData('expense', 'Gráfico de Despesas', '#E03131');
  }

  private getChartData(entryType: string, title: string, color: string): any {
    const chartData = [];

    this.categories.forEach(category => {
      const filteredEntries = this.entries.filter(
        entry => (entry.categoryId === category.id) &&
        (entry.type === entryType)
      );

      if (filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce(
          (total, entry) => total + currencyFormatter.unformat(entry.amount, { code: 'BRL'}), 0
        );

        chartData.push({
          categoryName: category.name,
          totalAmout: totalAmount
        });
      }
    });

    return {
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.totalAmount)
      }]
    };
  }
}
