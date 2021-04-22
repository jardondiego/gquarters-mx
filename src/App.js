import { useState, useEffect } from "react";
import { CircleSpinner } from "react-spinners-kit";
import axios from "axios";

import parseStationStatus from "./parseStationStatus";
import "./App.css";

import logo from "./logo.png";
import alphaStationImage from "./alpha-station.png";
import bravoStationImage from "./bravo-station.png";
import charlieStationImage from "./charlie-station.png";
import deltaStationImage from "./delta-station.png";

const stationsImages = {
  alpha: alphaStationImage,
  bravo: bravoStationImage,
  charlie: charlieStationImage,
  delta: deltaStationImage,
};

const EVERY_MINUTE = 60 * 1000;

function App() {
  async function fetchStationsStatus() {
    try {
      setStationsStatusLoading(true);
      setStationsStatusError(null);
      const response = await axios.get(process.env.REACT_APP_API_URL);
      setStationsStatus(response.data.map(parseStationStatus));
      setStationsStatusLoading(false);
    } catch (error) {
      setStationsStatusError(error);
      setStationsStatusLoading(false);
    }
  }

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
      <div className="Stations">
        {stationsStatus.map((stationStatus) => (
          <div className="Station" key={stationStatus.id}>
            <span className="Station__codename">{stationStatus.alias}</span>
            <img
              src={stationsImages[stationStatus.alias]}
              alt={stationStatus.alias}
              className="Station__image"
            />
            {stationStatus.available ? (
              <div className="Station__availability">
                <div className="Station__available"></div>
                <span className="Station__availability-label">Disponible</span>
              </div>
            ) : (
              <div className="Station__availability">
                <div className="Station__unavailable"></div>
                <span className="Station__availability-label">
                  Alguien está jugando...
                </span>
              </div>
            )}
            {stationStatus.busy_at !== null && (
              <div className="Station__will-be-busy">
                <span className="Station__will-be-busy__label">
                  se va a ocupar en:
                </span>
                <span className="Station__will-be-busy__eta">
                  {stationStatus.etaBusy}
                </span>
              </div>
            )}
            {!stationStatus.available && (
              <div className="Station__eta">
                <span className="Station__eta-label">se le acaba en:</span>
                <span className="Station__eta-value">
                  {stationStatus.etaFree}
                </span>
                <span
                  className={`Station__eta-is-queue ${
                    stationStatus.isQueue
                      ? "Station__eta-is-queue--enabled"
                      : ""
                  }`}
                >
                  {stationStatus.isQueue
                    ? "SI hay alguien esperando"
                    : "NO hay nadie esperando"}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
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
      </nav>
      {stationsStatusEl}
    </div>
  );
}

export default App;
