import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyWatchListService {
  private inputValue$: Subject<string> = new Subject<string>();

  saveInputValue(value: string): void {
    this.inputValue$.next(value);
  }

  getInputValue(): Observable<string> {
    return this.inputValue$.asObservable();
  }
}
