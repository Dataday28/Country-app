import { Region } from './../../interfaces/region.interface';
import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();

  const validRegion: Record<string, Region> = {
    Africa: 'Africa',
    Americas: 'Americas',
    Asia: 'Asia',
    Europe: 'Europe',
    Oceania: 'Oceania',
    Antarctic: 'Antarctic',
  };

  return validRegion[queryParam] ?? 'Americas';
}

@Component({
  selector: 'by-region-page',
  imports: [ListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  countryService = inject(CountryService)

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router)
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? ''

  selectedRegion = linkedSignal<Region|null>(() => validateQueryParam(this.queryParam));

  countryResource = rxResource({
    params: () => ({region: this.selectedRegion()}),
    stream: ({params}) => {
      if (!params.region) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: params.region
        }
      })

      return this.countryService.searchByRegion(params.region);
    }
  })

}
