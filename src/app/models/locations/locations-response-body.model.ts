import { Info } from '../info.model';
import { Location } from './location.model';

export interface LocationsResponseBody {
  info: Info;
  results: Location[];
}
