import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import {
  EpisodesQueryParams,
  EpisodesResponseBody,
} from '../models/episodes/episodes.model';
import { HttpApiService } from '../services/http-api.service';
import { EpisodesApiPath } from '../models/enums/episodes-api.enum';

@Injectable({ providedIn: 'root' })
export class EpisodesService {
  constructor(private httpService: HttpApiService) {}

  getAllEpisodes(): Observable<EpisodesResponseBody> {
    return this.httpService.get<EpisodesResponseBody>(EpisodesApiPath.ROOT);
  }

  getFilteredEpisodes(
    filters: EpisodesQueryParams,
    pageIndex?: number
  ): Observable<
    | EpisodesResponseBody
    | {
        results: any[];
        info: any;
      }
  > {
    const params = new HttpParams()
      .set('name', filters.name)
      .set('page', pageIndex);

    return this.httpService
      .get<EpisodesResponseBody>(EpisodesApiPath.ROOT, params)
      .pipe(catchError(() => of({ results: [], info: null })));
  }
}
