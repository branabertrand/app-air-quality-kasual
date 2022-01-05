export class MeasurementModel { 
    results: MeasurementCountryModel[];
}
  
export class MeasurementCountryModel{
    coordinates: CoordinateModel;
    location: string;
    value :number;
    unit : string;
    sensorType : string;
}
  
export class CoordinateModel{
    latitude: number;
    longitude: number;
}

export class CountryModel {
    capitalInfo : CountryCapitalModel;
    cca2 : string;
    name : CountryInformationModel;
}

export class CountryCapitalModel {
    latlng : number[];
}

export class CountryInformationModel {
    official : string;
}