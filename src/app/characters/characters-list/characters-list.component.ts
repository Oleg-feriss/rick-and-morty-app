import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';

import {
  Character,
  CharactersQueryParams,
} from 'src/app/models/characters/characters.model';
import { CharactersService } from '../characters.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() formGroup: FormGroup;
  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    if (paginator) {
      this._paginator = paginator;
      this.handlePaginatorChanges();
    }
  }

  _paginator: MatPaginator;
  characters: Character[];
  charactersCount: number;

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(private charactersService: CharactersService) {}

  ngOnInit(): void {
    this.charactersService
      .getAllCharacters()
      .pipe(takeUntil(this.destroy$))
      .subscribe((characters) => {
        this.characters = characters.results;
        this.charactersCount = characters.info.count;
      });
  }

  ngAfterViewInit(): void {
    this.formGroup.valueChanges
      .pipe(
        switchMap((values: CharactersQueryParams) =>
          this.charactersService.getFilteredCharacters(values)
        ),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((characters) => {
        this.characters = characters.results;
        this.charactersCount = characters.info?.count ?? 0;
        if (this._paginator) {
          this._paginator.pageIndex = 0;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handlePaginatorChanges(): void {
    this._paginator.page
      .pipe(
        switchMap(() =>
          this.charactersService.getFilteredCharacters(
            this.formGroup.value,
            this._paginator.pageIndex + 1
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((characters) => {
        this.characters = characters.results;
      });
  }
}
