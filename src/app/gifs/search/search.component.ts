import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  @ViewChild('txtBusqueda') txtBusqueda!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  buscar() {
    const busqueda = this.txtBusqueda.nativeElement.value;
    if (busqueda.trim()) this.gifsService.buscarGifs(busqueda);
    this.txtBusqueda.nativeElement.value = '';
    console.log(this.gifsService.historialBusqueda);
  }
}
