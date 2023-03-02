import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Character } from 'src/app/models/characters/characters.model';
import { ModalComponent } from 'src/app/common/modal/modal.component';
import { AnimationDuration } from 'src/app/models/enums/animation-duration.enum';

@Component({
  selector: 'app-character-item',
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.scss'],
})
export class CharacterItemComponent {
  @Input() character: Character;

  constructor(public detailDialog: MatDialog) {}

  onShowDetails(): void {
    this.detailDialog.open(ModalComponent, {
      enterAnimationDuration: AnimationDuration.MODAL_FADE_IN,
      exitAnimationDuration: AnimationDuration.MODAL_FADE_OUT,
      data: this.character,
    });
  }
}
