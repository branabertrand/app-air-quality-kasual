import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MeasurementModel } from 'src/models/viewmodels';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = "https://docs.openaq.org"  

  public getTiles(countryCode:string): Observable<MeasurementModel>{
    return this.http.get<MeasurementModel>(this.baseUrl + "/v2/measurements?country=" + countryCode);
  }
}
