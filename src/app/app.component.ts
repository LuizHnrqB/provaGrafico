import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { GraficoComponent } from './components/grafico/grafico.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GraficoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'provaGrafico';
}
