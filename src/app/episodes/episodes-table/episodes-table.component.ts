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

import { EPISODES_COLUMNS } from 'src/app/models/constants/episodes-columns.constant';
import { Episode } from 'src/app/models/episodes/episode.model';
import { EpisodesQueryParams } from 'src/app/models/episodes/episodes-query-params.model';
import { TableColumn } from 'src/app/models/table/table-column.model';
import { EpisodesService } from '../episodes.service';

@Component({
  selector: 'app-episodes-table',
  templateUrl: './episodes-table.component.html',
  styleUrls: ['./episodes-table.component.scss'],
})
export class EpisodesTableComponent
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
  episodes: Episode[];
  episodesCount: number;
  columns: TableColumn[] = EPISODES_COLUMNS;

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(private episodesService: EpisodesService) {}

  ngOnInit(): void {
    this.episodesService
      .getAllEpisodes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.episodes = data.results;
        this.episodesCount = data.info.count;
      });
  }

  ngAfterViewInit(): void {
    this.formGroup.valueChanges
      .pipe(
        switchMap((values: EpisodesQueryParams) =>
          this.episodesService.getFilteredEpisodes(values)
        ),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.episodes = data.results;
        this.episodesCount = data.info?.count ?? 0;
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
          this.episodesService.getFilteredEpisodes(
            this.formGroup.value,
            this._paginator.pageIndex + 1
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.episodes = data.results;
      });
  }
}
