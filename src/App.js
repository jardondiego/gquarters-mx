// External imports
import { useState, useEffect } from "react";
import { CircleSpinner } from "react-spinners-kit";
import axios from "axios";

// Local imports
import parseStationStatus from "./parseStationStatus";
import { Stations } from "./components";
import { apiUrl } from "./constants";

// Assets
import logo from "assets/logo.png";
import facebookIcon from "assets/facebook.svg";

// Styles
import "./App.css";

const EVERY_MINUTE = 60 * 1000;

function App() {
  async function fetchStationsStatus() {
    try {
      setStationsStatusLoading(true);
      setStationsStatusError(null);
      const response = await axios.get(apiUrl);
      setStationsStatus(response.data.map(parseStationStatus));
      setStationsStatusLoading(false);
    } catch (error) {
      setStationsStatusError(error);
      setStationsStatusLoading(false);
    }
  }

  useEffect(() => {
    const messaging = firebase.messaging();
    const { vapidKey } = globals;
    messaging
      .getToken({
        vapidKey,
      })
      .then(console.log)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchStationsStatus();
    // Fetch stations status from API
    const pid = setInterval(fetchStationsStatus, EVERY_MINUTE);

    return () => clearInterval(pid);
  }, []);

  const [stationsStatusError, setStationsStatusError] = useState(null);
  const [stationsStatusLoading, setStationsStatusLoading] = useState(false);
  const [stationsStatus, setStationsStatus] = useState(null);

  let stationsStatusEl = null;
  if (stationsStatus !== null) {
    stationsStatusEl = (
      <Stations stationsStatus={stationsStatus} />
    );
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
