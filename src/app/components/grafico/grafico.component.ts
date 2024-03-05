import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatSelectChange } from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import comidas from '../../data/comidas.json';
import roupas from '../../data/roupas.json';
import eletronicos from '../../data/eletronicos.json';
import {
  Comidas,
  Eletronicos,
  Roupas,
  filteredData,
} from '../../interfaces/data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [MatSelectModule, CommonModule, FormsModule],
  styleUrls: ['./grafico.component.scss'],
  templateUrl: './grafico.component.html',
})
export class GraficoComponent implements OnInit, AfterViewInit {
  @ViewChild('myChart') private chartRef!: ElementRef;
  public chart!: Chart;

  comidas: Comidas = comidas as Comidas;
  roupas: Roupas = roupas as Roupas;
  eletronicos: Eletronicos = eletronicos as Eletronicos;
  selectedData: any;
  selectList: string[] = ['Eletrônicos', 'Roupas', 'Comidas'];
  selectedComida: string[] = ['Pizza', 'Sanduíche', 'Sushi'];
  selectRoupa: string[] = ['Bonés', 'Calças', 'Camisas'];
  selectEletronico: string[] = ['Microondas', 'Geladeiras', 'Airfrier'];
  filterData: any;
  produtoLista: string[] = [];
  selectedTipo: String | undefined;
  selectedProduto: String = '';
  selectedMarca: String = '';
  marcaVendas: any;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
  getProductList(): any[] {
    if (this.selectedTipo === 'Comidas') {
      this.selectedData = this.comidas;

      return this.selectedComida;
    } else if (this.selectedTipo === 'Roupas') {
      this.selectedData = this.roupas;

      return this.selectRoupa;
    } else if (this.selectedTipo === 'Eletrônicos') {
      this.selectedData = this.eletronicos;

      return this.selectEletronico;
    }

    return [];
  }
  onSelect(event: MatSelectChange): void {
    this.selectedTipo = event.value;
    this.marcaVendas = [];

    this.produtoLista = this.getProductList();
  }
  onSelectMarca(event: MatSelectChange): void {
    this.selectedMarca = event.value;

    let filtro = this.filterData.filter(
      (item: filteredData) => item.nome === this.selectedMarca
    );

    if (filtro.length) {
      filtro = filtro[0];
    }
    this.marcaVendas = filtro.vendas;

    this.updateChart();
  }

  onSelectProduto(event: MatSelectChange): void {
    let filtro = event.value;

    if (this.selectedData.hasOwnProperty(filtro)) {
      this.filterData = this.selectedData[filtro];
    }
  }
  updateChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.renderGrafico();
    this.cdRef.detectChanges();
  }

  renderGrafico() {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ],
        datasets: [
          {
            label: 'Vendas',
            data: this.marcaVendas,
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        aspectRatio: 3,
      },
    });
  }
}
