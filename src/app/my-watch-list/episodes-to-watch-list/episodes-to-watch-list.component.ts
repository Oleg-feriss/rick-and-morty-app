import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { getRandomId } from 'src/app/helpers/get-random-id.helper';
import { CheckedEpisode } from 'src/app/models/watch-list/checked-episode.model';
import { EpisodeToWatch } from 'src/app/models/watch-list/episode-to-watch.model';
import { LocalService } from 'src/app/services/local.service';
import { MyWatchListService } from '../my-watch-list.service';

@Component({
  selector: 'app-episodes-to-watch-list',
  templateUrl: './episodes-to-watch-list.component.html',
  styleUrls: ['./episodes-to-watch-list.component.scss'],
})
export class EpisodesToWatchListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  public episodesToWatch: EpisodeToWatch[];

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(
    private localService: LocalService,
    private myWatchListService: MyWatchListService
  ) {}

  ngOnInit(): void {
    this.episodesToWatch =
      JSON.parse(this.localService.getData('episodesToWatch')) || [];
  }

  ngAfterViewInit(): void {
    this.myWatchListService
      .getInputValue()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        const id = getRandomId();

        this.localService.saveData(
          'episodesToWatch',
          JSON.stringify([
            ...this.episodesToWatch,
            {
              id: id,
              name: value,
              isChecked: false,
            },
          ])
        );

        this.episodesToWatch.push({ id: id, name: value, isChecked: false });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleCheckStatus(checkedEpisode: CheckedEpisode): void {
    const toggledEpisode = this.episodesToWatch.find(
      (item) => item.id === checkedEpisode.id
    );
    toggledEpisode.isChecked = checkedEpisode.isChecked;

    this.saveDataToLocalStorage();
  }

  delete(id: string): void {
    this.episodesToWatch = this.episodesToWatch.filter(
      (item) => item.id !== id
    );

    this.saveDataToLocalStorage();
  }

  private saveDataToLocalStorage() {
    this.localService.saveData(
      'episodesToWatch',
      JSON.stringify(this.episodesToWatch)
    );
  }
}
