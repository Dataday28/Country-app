import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'not-found',
  imports: [],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  location = inject(Location)

  goBack() {
    this.location.back();
  }
}
