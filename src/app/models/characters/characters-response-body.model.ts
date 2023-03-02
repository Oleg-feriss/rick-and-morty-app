import { Character } from './character.model';
import { Info } from '../info.model';

export interface CharactersResponseBody {
  info: Info;
  results: Character[];
}
