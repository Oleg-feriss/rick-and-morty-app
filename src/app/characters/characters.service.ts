import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import {
  CharactersResponseBody,
  CharactersQueryParams,
} from '../models/characters/characters.model';
import { CharactersApiPath } from '../models/enums/character-api.enum';
import { HttpApiService } from '../services/http-api.service';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  constructor(private httpService: HttpApiService) {}

  getAllCharacters(): Observable<CharactersResponseBody> {
    return this.httpService.get<CharactersResponseBody>(CharactersApiPath.ROOT);
  }

  getFilteredCharacters(
    filters: CharactersQueryParams,
    pageIndex?: number
  ): Observable<
    | CharactersResponseBody
    | {
        results: any[];
        info: any;
      }
  > {
    const params = new HttpParams()
      .set('species', filters.species)
      .set('status', filters.status)
      .set('gender', filters.gender)
      .set('page', pageIndex);

    return this.httpService
      .get<CharactersResponseBody>(CharactersApiPath.ROOT, params)
      .pipe(catchError(() => of({ results: [], info: null })));
  }
}
