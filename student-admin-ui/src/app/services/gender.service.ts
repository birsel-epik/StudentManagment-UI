import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GenderModel} from "../models/api-models/gender.model";

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private baseApiUrl = 'https://localhost:44381'

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getGenderList(): Observable<GenderModel[]> {
    return this.httpClient.get<GenderModel[]>(this.baseApiUrl + '/Genders');
  }

}
