import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryModel, MeasurementModel } from 'src/models/viewmodels';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = "https://restcountries.com/v3.1"  

  public getAllCountries(): Observable<CountryModel[]>{
    return this.http.get<CountryModel[]>(this.baseUrl + "/all");
  }
}
