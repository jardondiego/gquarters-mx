import moment from "moment";
import 'moment/locale/es-mx'

export default function parseStationStatus({ id, alias, finishes_at, isQueue }) {
  const eta = moment(finishes_at).locale("es-mx").fromNow();
  const available = !moment().isBefore(moment(finishes_at));

  return {
    id,
    alias,
    eta,
    available,
    isQueue
  };
}
