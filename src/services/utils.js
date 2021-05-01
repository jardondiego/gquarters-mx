import moment from "moment";

function parseStationStatus({ id, alias, free_at, busy_at, is_queue }) {
  const etaHoursFree = moment(free_at).diff(moment(), "hours");
  const etaMinsFree = moment(free_at).diff(moment(), "minutes") % 60;
  const etaFree =
    etaHoursFree > 0
      ? `${etaHoursFree} horas y ${etaMinsFree} minutos`
      : `${etaMinsFree} minutos`;

  const etaHoursBusy = moment(busy_at).diff(moment(), "hours");
  const etaMinsBusy = moment(busy_at).diff(moment(), "minutes") % 60;
  const etaBusy =
    etaHoursBusy > 0
      ? `${etaHoursBusy} horas y ${etaMinsBusy} minutos`
      : `${etaMinsBusy} minutos`;
  const available = !moment().isBefore(moment(free_at));

  return {
    id,
    alias,
    busy_at,
    etaFree: available ? null : etaFree,
    etaBusy,
    available,
    isQueue: is_queue,
  };
}

const utils = {
  parseStationStatus,
};
export default utils;
