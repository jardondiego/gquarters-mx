import React from "react";
import PropTypes from "prop-types";

import alphaStationImage from "assets/alpha-station.png";
import bravoStationImage from "assets/bravo-station.png";
import charlieStationImage from "assets/charlie-station.png";
import deltaStationImage from "assets/delta-station.png";

import './Stations.css';

const stationsImages = {
  alpha: alphaStationImage,
  bravo: bravoStationImage,
  charlie: charlieStationImage,
  delta: deltaStationImage,
};

function Stations({ stationsStatus }) {
  return (
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
          {stationStatus.busy_at !== null && stationStatus.available && (
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
                  stationStatus.isQueue ? "Station__eta-is-queue--enabled" : ""
                }`}
              >
                {stationStatus.isQueue
                  ? "hay alguien esperando"
                  : "NO hay nadie esperando"}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

Stations.propTypes = {
  stationsStatus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      alias: PropTypes.string.isRequired,
      isQueue: PropTypes.bool.isRequired,
      available: PropTypes.bool.isRequired,
      busyAt: PropTypes.oneOf([PropTypes.instanceOf(Date), null]),
      etaBusy: PropTypes.string.isRequired,
      etaFree: PropTypes.oneOf([PropTypes.string.isRequired, null]),
    }).isRequired
  ).isRequired,
};

export default Stations;
