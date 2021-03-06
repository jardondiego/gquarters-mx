import axios from "axios";
import globals from "./globals";

export default class API {
  static async getStationsAvailability() {
    return axios.get(`${globals.apiUrl}/stations/getAvailability`);
  }

  static async subscribeForNotifications(token) {
    return axios.post(`${globals.apiUrl}/stations/subscribeOnAvailable`, {
      token,
    });
  }
}
