import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MIN_NAME_LENGTH } from '../models/constants/my-watch-list.constant';
import { MyWatchListService } from './my-watch-list.service';

@Component({
  selector: 'app-my-watch-list',
  templateUrl: './my-watch-list.component.html',
  styleUrls: ['./my-watch-list.component.scss'],
})
export class MyWatchListComponent implements AfterViewInit {
  public minNameLength: number = MIN_NAME_LENGTH;
  public inputValue: string = '';
  public formGroup: FormGroup = new FormGroup({
    episodeName: new FormControl(''),
  });

  constructor(private myWatchListService: MyWatchListService) {}

  ngAfterViewInit(): void {
    this.formGroup.valueChanges.subscribe((value: { episodeName: string }) => {
      this.inputValue = value.episodeName;
    });
  }

  onAddEpisode(): void {
    this.myWatchListService.saveInputValue(this.inputValue);
    this.formGroup.patchValue({ episodeName: '' });
  }
}
