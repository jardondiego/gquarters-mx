// External imports
import { useState, useEffect } from "react";
import { CircleSpinner } from "react-spinners-kit";

// Local imports
import { firebase, globals, api } from "services";
import parseStationStatus from "./parseStationStatus";
import { Stations } from "./components";

// Assets
import logo from "assets/logo.png";
import facebookIcon from "assets/facebook.svg";
import addNotificationsIcon from "assets/notification-add.svg";

// Styles
import "./App.css";

const EVERY_MINUTE = 60 * 1000;

function App() {
  const [stationsStatusError, setStationsStatusError] = useState(null);
  const [stationsStatusLoading, setStationsStatusLoading] = useState(false);
  const [stationsStatus, setStationsStatus] = useState(null);
  const [FCMToken, setFCMToken] = useState(null);

  async function activateNotifications() {
    const messaging = firebase.messaging();
    const { vapidKey } = globals;
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(
          `./${globals.workerUrl}`
        );
        const token = await messaging.getToken({
          vapidKey,
          serviceWorkerRegistration: registration,
        });
        localStorage.setItem("fcm_token", token);
        setFCMToken(token);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function fetchStationsStatus() {
    try {
      setStationsStatusLoading(true);
      setStationsStatusError(null);
      const response = await api.getStationsAvailability();
      setStationsStatus(response.data.map(parseStationStatus));
      setStationsStatusLoading(false);
    } catch (error) {
      setStationsStatusError(error);
      setStationsStatusLoading(false);
    }
  }

  useEffect(() => {
    const lsFCMToken = localStorage.getItem("fcm_token");
    if (lsFCMToken !== null) {
      setFCMToken(lsFCMToken);
      return;
    }
  }, []);

  useEffect(() => {
    if (FCMToken !== null) api.subscribeForNotifications(FCMToken);
  }, [FCMToken]);

  useEffect(() => {
    fetchStationsStatus();
    // Fetch stations status from API
    const pid = setInterval(fetchStationsStatus, EVERY_MINUTE);
    return () => clearInterval(pid);
  }, []);

  let stationsStatusEl = null;
  if (stationsStatus !== null) {
    stationsStatusEl = <Stations stationsStatus={stationsStatus} />;
  } else if (stationsStatusError !== null) {
    stationsStatusEl = (
      <div className="Error">
        <span className="Error__message">Ocurrió un error. :(</span>
        <details>
          <summary>Ver más</summary>
          <p>{stationsStatusError.toString()}</p>
        </details>
      </div>
    );
  } else if (stationsStatusLoading) {
    stationsStatusEl = (
      <div className="Loader">
        <CircleSpinner />
      </div>
    );
  }

  return (
    <div className="App">
      <nav className="Navigation">
        <a className="Navigation__link" href="/">
          <img className="Navigation__logo" src={logo} alt="Gaming Quarters" />
        </a>
        <a
          className="Navigation__link Navigation__notifications"
          href="#!"
          onClick={() => activateNotifications()}
        >
          <img src={addNotificationsIcon} alt="Activate notifications" />
        </a>
        <a
          className="Navigation__link"
          href={process.env.REACT_APP_FACEBOOK_URL}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="Navigation__facebook"
            src={facebookIcon}
            alt="Facebook"
          />
        </a>
      </nav>
      {stationsStatusEl}
    </div>
  );
}

export default App;
