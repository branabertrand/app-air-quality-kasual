import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CountryModel, MeasurementCountryModel } from 'src/models/viewmodels';
import { CountryService } from 'src/services/country.service';
import { MeasurementService } from 'src/services/measurement.service';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.scss']
})
export class MeasurementComponent implements OnInit, AfterViewInit  {

  private map;
  selectedCountry : string;
  countries : CountryModel[];  
  private markers : any[];

  constructor(private measurementService : MeasurementService, private countryService : CountryService) { }

  private initMap(): void {

    let lat = 0;
    let lng = 0;
    
    if (this.selectedCountry != null) {
      let defaultCountry = this.getCountry(this.selectedCountry);
      if (defaultCountry != null) {
        lat = defaultCountry.capitalInfo.latlng[0];
        lng = defaultCountry.capitalInfo.latlng[1];
      }
    }

    this.map = L.map('map', {
      center: [ lat, lng ],
      zoom: 3
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }


  ngOnInit(): void {
    this.selectedCountry = "FR"; 
    this.countryService.getAllCountries().subscribe(res => {
      this.countries = res;
      
      this.initMap();

      this.onSendToMap();
    });
  }

  ngAfterViewInit(): void {
  }

  onSendToMap() {
    if(this.selectedCountry != null) { 
  
        this.removeMarkers();

        this.measurementService.getTiles(this.selectedCountry).subscribe(data => {
          if (data.results != null) {

            this.addMarkers(data.results);

            this.moveMapToCountry();
          }
        })
      }
  }

  private removeMarkers() {
    if (this.markers != null) {
      this.markers.forEach(element => {
        this.map.removeLayer(element);
      });
    }
    this.markers = [];
  }

  private moveMapToCountry() {
    let movedCountry =this.getCountry(this.selectedCountry);
    this.map.panTo(new L.LatLng(movedCountry.capitalInfo.latlng[0], movedCountry.capitalInfo.latlng[1]));
  }

  private addMarkers(results : MeasurementCountryModel[]) {
    results.forEach(element => { 
      const marker = L.marker([element.coordinates.latitude, element.coordinates.longitude]);

      this.addPopupToMarker(marker, element);

      this.markers.push(marker);
      marker.addTo(this.map);
    });
  }

  private addPopupToMarker(marker : any, measurement : MeasurementCountryModel) {

    marker.bindPopup(`<b>${measurement.location}</b><br>Valeur : ${measurement.value} ${measurement.unit}<br/> Type : ${measurement.sensorType}.`)
    .openPopup();

  }

  private getCountry(code : string) : CountryModel{
    return this.countries.find(x => x.cca2 == code);
  }

}
