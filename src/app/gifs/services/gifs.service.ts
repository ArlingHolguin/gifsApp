import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsresponse } from '../interfaces/gif.Interfsces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'YpByDd5ZRGCMFpoFW8NZnH9xcbcKGeeb';
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
    this.http.get<SearchGifsresponse>(`http://api.giphy.com/v1/gifs/search?api_key=${ this.apiKey }&q=${ query }&limit=15`)
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        //guardar resultados en local storage
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });

  }
}
