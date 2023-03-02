import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import {
  LocationsQueryParams,
  LocationsResponseBody,
} from '../models/locations/locations.model';
import { HttpApiService } from '../services/http-api.service';
import { LocationsApiPath } from '../models/enums/locations-api.enum';

@Injectable({ providedIn: 'root' })
export class LocationsService {
  constructor(private httpService: HttpApiService) {}

  getAllLocations(): Observable<LocationsResponseBody> {
    return this.httpService.get<LocationsResponseBody>(LocationsApiPath.ROOT);
  }

  getFilteredLocations(
    filters: LocationsQueryParams,
    pageIndex?: number
  ): Observable<
    | LocationsResponseBody
    | {
        results: any[];
        info: any;
      }
  > {
    const params = new HttpParams()
      .set('name', filters.name)
      .set('type', filters.type)
      .set('dimension', filters.dimension)
      .set('page', pageIndex);

    return this.httpService
      .get<LocationsResponseBody>(LocationsApiPath.ROOT, params)
      .pipe(catchError(() => of({ results: [], info: null })));
  }
}
