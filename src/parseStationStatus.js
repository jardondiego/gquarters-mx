import moment from "moment";

export default function parseStationStatus({
  id,
  alias,
  finishes_at
}) {
  const etaHours = Math.abs(moment(finishes_at).diff(moment(), "hours"));
  const etaMins = Math.abs(moment(finishes_at).diff(moment(), "minutes") % 60);
  const eta =
    etaHours > 0
      ? `${etaHours} horas y ${etaMins} minutos`
      : `${etaMins} minutos`;

  return {
    id,
    alias,
    eta,
    available: !moment().isBefore(moment(finishes_at)),
  };
}