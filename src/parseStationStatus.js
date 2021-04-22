import moment from "moment";
import "moment/locale/es-mx";

export default function parseStationStatus({
  id,
  alias,
  finishes_at,
  isQueue,
}) {
  const etaHours = Math.abs(moment(finishes_at).diff(moment(), "hours"));
  const etaMins = Math.abs(moment(finishes_at).diff(moment(), "minutes") % 60);
  const eta =
    etaHours > 0
      ? `${etaHours} horas y ${etaMins} minutos`
      : `${etaMins} minutos`;
  const available = !moment().isBefore(moment(finishes_at));

  return {
    id,
    alias,
    eta,
    available,
    isQueue,
  };
}
