import { Component, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop'
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  // Resorce Con Observables //
  countryResource = rxResource({
    params: () => ({query: this.query()}),
    stream: ({params}) => {
      if (!params.query) return of([]);

      return this.countryService.searchByCapital(params.query)
    }
  })

}

// Resource Con Promesas //
  // countryResource = resource({
  //   params: () => ({query: this.query()}),
  //   loader: async({params}) => {
  //     if (!params.query) return [];

  //     return await firstValueFrom(this.countryService.searchByCapital(params.query))
  //   }
  // })
