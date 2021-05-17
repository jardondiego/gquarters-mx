import React from "react";
import PropTypes from "prop-types";

import Station from "../Station";

import "./Stations.css";

function Stations({ stationsStatus }) {
  return (
    <div className="Stations">
      {stationsStatus.map((stationStatus) => (
        <Station key={stationStatus.id} {...stationStatus} />
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
      imageUrl: PropTypes.oneOf([PropTypes.string.isRequired, null]),
    }).isRequired
  ).isRequired,
};

export default Stations;
