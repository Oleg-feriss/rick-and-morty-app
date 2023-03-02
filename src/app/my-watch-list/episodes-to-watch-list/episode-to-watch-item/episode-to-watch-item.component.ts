import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { EpisodeToWatch } from 'src/app/models/watch-list/episode-to-watch.model';

@Component({
  selector: 'app-episode-to-watch-item',
  templateUrl: './episode-to-watch-item.component.html',
  styleUrls: ['./episode-to-watch-item.component.scss'],
})
export class EpisodeToWatchItemComponent {
  @Input() episodeToWatch: EpisodeToWatch;
  @Output() checked = new EventEmitter<EpisodeToWatch>();
  @Output() delete = new EventEmitter<string>();

  onChange(checkbox: MatCheckboxChange): void {
    this.checked.emit({
      ...this.episodeToWatch,
      isChecked: checkbox.checked,
    });
  }

  onDelete() {
    this.delete.emit(this.episodeToWatch.id);
  }
}
