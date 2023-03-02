import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';

import { LOCATIONS_COLUMNS } from 'src/app/models/constants/locations-columns.constant';
import {
  Location,
  LocationsQueryParams,
} from 'src/app/models/locations/locations.model';
import { TableColumn } from 'src/app/models/table/table-column.model';
import { LocationsService } from '../locations.service';

@Component({
  selector: 'app-locations-table',
  templateUrl: './locations-table.component.html',
  styleUrls: ['./locations-table.component.scss'],
})
export class LocationsTableComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    if (paginator) {
      this._paginator = paginator;
      this.handlePaginatorChanges();
    }
  }

  _paginator: MatPaginator;
  locations: Location[];
  locationsCount: number;
  columns: TableColumn[] = LOCATIONS_COLUMNS;

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(private locationsService: LocationsService) {}

  ngOnInit(): void {
    this.locationsService
      .getAllLocations()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.locations = data.results;
        this.locationsCount = data.info.count;
      });
  }

  ngAfterViewInit(): void {
    this.formGroup.valueChanges
      .pipe(
        switchMap((values: LocationsQueryParams) =>
          this.locationsService.getFilteredLocations(values)
        ),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.locations = data.results;
        this.locationsCount = data.info?.count ?? 0;
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
          this.locationsService.getFilteredLocations(
            this.formGroup.value,
            this._paginator.pageIndex + 1
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.locations = data.results;
      });
  }
}
