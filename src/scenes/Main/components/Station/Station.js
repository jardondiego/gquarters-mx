import React from "react";
import PropTypes from "prop-types";

import "./Station.css"

function Station({
  id,
  alias,
  available,
  busy_at: busyAt,
  etaBusy,
  etaFree,
  isQueue,
  imageUrl,
}) {
  return (
    <div className="Station" key={id}>
      <span className="Station__codename">{alias}</span>
      <img src={imageUrl} alt={alias} className="Station__image" />
      {available ? (
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
      {busyAt !== null && available && (
        <div className="Station__will-be-busy">
          <span className="Station__will-be-busy__label">
            se va a ocupar en:
          </span>
          <span className="Station__will-be-busy__eta">{etaBusy}</span>
        </div>
      )}
      {!available && (
        <div className="Station__eta">
          <span className="Station__eta-label">se le acaba en:</span>
          <span className="Station__eta-value">{etaFree}</span>
          <span
            className={`Station__eta-is-queue ${
              isQueue ? "Station__eta-is-queue--enabled" : ""
            }`}
          >
            {isQueue ? "hay alguien esperando" : "NO hay nadie esperando"}
          </span>
        </div>
      )}
    </div>
  );
}

Station.propTypes = {
  id: PropTypes.string.isRequired,
  alias: PropTypes.string.isRequired,
  isQueue: PropTypes.bool.isRequired,
  available: PropTypes.bool.isRequired,
  busyAt: PropTypes.oneOf([PropTypes.instanceOf(Date), null]),
  etaBusy: PropTypes.string.isRequired,
  etaFree: PropTypes.oneOf([PropTypes.string.isRequired, null]),
  imageUrl: PropTypes.oneOf([PropTypes.string.isRequired, null]),
};

export default Station;
