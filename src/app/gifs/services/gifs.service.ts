import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'avHaPJWKMcXQOUfLFwmJ6FwgdxIiLspJ';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historialBusqueda: string[] = [];
  // TODO: Cambiar any por su tipo correspondiente
  public resultados: Gif[] = [];

  get historialBusqueda() {
    return [...this._historialBusqueda];
  }

  constructor(private httpClient: HttpClient) {
    this._historialBusqueda =
      JSON.parse(localStorage.getItem('historialBusqueda')!) ?? [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) ?? [];
  }

  buscarGifs(query: string = '') {
    query.toLowerCase();
    // if (this._historialBusqueda.indexOf(query) < 0)
    if (!this._historialBusqueda.includes(query)) {
      this._historialBusqueda.unshift(query);
      this._historialBusqueda = this._historialBusqueda.splice(0, 10);
      localStorage.setItem(
        'historialBusqueda',
        JSON.stringify(this._historialBusqueda)
      );
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.httpClient
      .get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp: SearchGifsResponse) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(resp.data));
      });
  }
}
