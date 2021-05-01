import moment from "moment";

const stationsStatus = [
  {
    alias: "alpha",
    id: "1",
    free_at: null,
    is_queue: false,
    busy_at: null,
  },
  {
    alias: "bravo",
    id: "2",
    free_at: moment().add(30, "minutes"),
    is_queue: false,
    busy_at: null,
  },
];

export default stationsStatus;
