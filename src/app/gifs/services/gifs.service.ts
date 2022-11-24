import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsresponse } from '../interfaces/gif.Interfsces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'YpByDd5ZRGCMFpoFW8NZnH9xcbcKGeeb';
  private servicioUrl: string = 'http://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    //historial
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    //resultados
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);

    // }
  }



  buscarGifs(query:string = ''){

    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);


    this.http.get<SearchGifsresponse>(`${this.servicioUrl}/search`, {params})
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        //guardar resultados en local storage
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });

  }
}
