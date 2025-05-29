import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClapperboard,
  faCalendarAlt,
  faMasksTheater,
} from '@fortawesome/free-solid-svg-icons';

export const DirectorIcon = () => (
  <FontAwesomeIcon icon={faClapperboard} className="text-accent mr-1" />
);

export const CalendarIcon = () => (
  <FontAwesomeIcon icon={faCalendarAlt} className="text-accent mr-1" />
);

export const GenreIcon = () => (
  <FontAwesomeIcon icon={faMasksTheater} className="text-accent mr-1" />
);