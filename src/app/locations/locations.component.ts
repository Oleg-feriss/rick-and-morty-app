import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent {
  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    dimension: new FormControl(''),
  });
}
