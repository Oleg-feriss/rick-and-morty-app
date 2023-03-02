import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent {
  public formGroup: FormGroup = new FormGroup({
    species: new FormControl(''),
    status: new FormControl(''),
    gender: new FormControl(''),
  });
}
