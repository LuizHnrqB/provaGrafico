import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { GraficoComponent } from './grafico.component';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { Chart } from 'chart.js';

describe('GraficoComponent', () => {
  let component: GraficoComponent;
  let fixture: ComponentFixture<GraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        MatSelectModule,
        CommonModule,
        FormsModule,
        GraficoComponent,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      providers: [ChangeDetectorRef],
    }).compileComponents();

    fixture = TestBed.createComponent(GraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('o gráfico deve atualizar caso a função updateChart seja chamada', fakeAsync(() => {
    spyOn(component, 'renderGrafico').and.callThrough();

    component.marcaVendas = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
    component.updateChart();
    fixture.detectChanges();
    tick();

    expect(component.renderGrafico).toHaveBeenCalled();
    expect(component.chart).toBeDefined();
    expect(component.chart instanceof Chart).toBeTruthy();
  }));

  it('produtoLista deve atualizar quando selectedTipo for alterado', fakeAsync(() => {
    spyOn(component, 'getProductList').and.callThrough();
    const mockMatSelect = jasmine.createSpyObj('MatSelect', ['value']);
    mockMatSelect.value = 'Roupas';
    const mockMatSelectChange = new MatSelectChange(mockMatSelect, 'Roupas');
    component.onSelect(mockMatSelectChange);
    fixture.detectChanges();
    tick();
    expect(component.getProductList).toHaveBeenCalled();
    expect(component.produtoLista).toEqual(['Bonés', 'Calças', 'Camisas']);
  }));
});
