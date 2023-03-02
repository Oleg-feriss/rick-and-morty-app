import { Info } from '../info.model';
import { Episode } from './episode.model';

export interface EpisodesResponseBody {
  info: Info;
  results: Episode[];
}
