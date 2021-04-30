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
import checkIcon from "assets/done.svg";
import errorIcon from "assets/error.svg";

// Styles
import "./App.css";

const EVERY_MINUTE = 60 * 1000;

function App() {
  const [stationsStatusError, setStationsStatusError] = useState(null);
  const [stationsStatusLoading, setStationsStatusLoading] = useState(false);
  const [stationsStatus, setStationsStatus] = useState(null);

  const [isActivatingNotifications, setIsActivatingNotifications] = useState(
    false
  );
  const [
    isActivatingNotificationsError,
    setIsActivatingNotificationsError,
  ] = useState(null);
  const [
    isActivatingNotificationsSuccess,
    setIsActivatingNotificationsSuccess,
  ] = useState(false);
  const [FCMToken, setFCMToken] = useState(null);

  const lsFCMToken = localStorage.getItem("fcm_token");

  async function activateNotifications() {
    const messaging = firebase.messaging();
    const { vapidKey } = globals;
    if ("serviceWorker" in navigator) {
      try {
        setIsActivatingNotifications(true);
        const registration = await navigator.serviceWorker.register(
          `./${globals.workerUrl}`
        );
        const token = await messaging.getToken({
          vapidKey,
          serviceWorkerRegistration: registration,
        });
        localStorage.setItem("fcm_token", token);
        setFCMToken(token);
        setIsActivatingNotificationsSuccess(true);
      } catch (error) {
        setIsActivatingNotificationsError(error);
        console.error(error);
      }
      setIsActivatingNotifications(false);
    } else {
      setIsActivatingNotificationsError(
        new Error("Service worker is not supported in this browser!")
      );
    }
    setTimeout(() => {
      setIsActivatingNotifications(false);
      setIsActivatingNotificationsError(null);
      setIsActivatingNotificationsSuccess(false);
    }, 2500);
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
    if (lsFCMToken !== null) {
      setFCMToken(lsFCMToken);
      return;
    }
  }, [lsFCMToken]);

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

  let notificationsCue = (
    <img src={addNotificationsIcon} alt="Activate notifications" />
  );

  if (isActivatingNotifications)
    notificationsCue = <CircleSpinner color="black" />;
  else if (isActivatingNotificationsSuccess)
    notificationsCue = <img src={checkIcon} alt="Notifications on!" />;
  else if (isActivatingNotificationsError)
    notificationsCue = <img src={errorIcon} alt="Error" />;

  return (
    <div className="App">
      <nav className="Navigation">
        <a className="Navigation__link" href="/">
          <img className="Navigation__logo" src={logo} alt="Gaming Quarters" />
        </a>
        {!lsFCMToken && (
          <a
            className="Navigation__link Navigation__notifications"
            href="#!"
            onClick={() => activateNotifications()}
          >
            {notificationsCue}
          </a>
        )}
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
