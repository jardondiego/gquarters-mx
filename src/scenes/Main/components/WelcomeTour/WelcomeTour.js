import React from "react";
import PropTypes from "prop-types";
import Tour from "reactour";

import Stations from "../Stations";
import { utils } from "services";

function WelcomeTour({ isOpen, onClose }) {
  const demoStationsStatus = [
    {
      alias: "alpha",
      id: "1",
      free_at: "",
      is_queue: false,
      busy_at: null,
    },
    { alias: "bravo", id: "2", free_at: "", is_queue: false, busy_at: null },
  ].map(utils.parseStationStatus);

  console.log(demoStationsStatus)

  const steps = [
    {
      selector: "",
      content: "Bienvenido!",
    },
    {
      selector: "[data-tour='enable-notifications']",
      content: "Estas son las notificaciones",
    },
    {
      selector: ".Station:nth-child(1)",
      content: "Esta es la primera estación",
      position: "bottom",
    },
    {
      selector: ".Station:nth-child(2)",
      content: "Esta es la segunda estación",
      position: "top",
    },
  ];

  const tour = <Tour steps={steps} isOpen={isOpen} onRequestClose={onClose} />;

  return (
    <>
      {tour}
      <Stations stationsStatus={demoStationsStatus} />
    </>
  );
}

WelcomeTour.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default WelcomeTour;
