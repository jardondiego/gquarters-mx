import { useState, useEffect } from "react";
import { CircleSpinner } from "react-spinners-kit";
import axios from "axios";

import parseStationStatus from './parseStationStatus';
import "./App.css";

import logo from "./logo.png";
import marcusStationImage from "./marcus-station.png";
import orionStationImage from "./orion-station.png";

const stationsImages = {
  marcus: marcusStationImage,
  orion: orionStationImage,
};

const EVERY_MINUTE = 60 * 1000;

function App() {
  async function fetchStationsStatus() {
    try {
      setStationsStatusLoading(true);
      setStationsStatusError(null);
      const response = await axios.get(process.env.REACT_APP_API_URL);
      setStationsStatus(response.data);
      setStationsStatusLoading(false);
    } catch (error) {
      setStationsStatusError(error);
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
        {stationsStatus.map(parseStationStatus).map((stationStatus, i) => (
          <div className="Station" key={i}>
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
                  No disponible
                </span>
              </div>
            )}
            {!stationStatus.available && (
              <div className="Station__eta">
                <span className="Station__eta-label">Se desocupa en: </span>
                <span className="Station__eta-value">{stationStatus.eta}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  } else if (stationsStatusLoading) {
    stationsStatusEl = (
      <div className="Loader">
        <CircleSpinner />
      </div>
    )
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
