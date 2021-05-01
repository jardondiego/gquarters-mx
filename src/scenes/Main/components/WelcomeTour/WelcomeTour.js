import React from "react";
import PropTypes from "prop-types";
import Tour from "reactour";

import Stations from "../Stations";
import { utils } from "services";

import demoStationsStatus from "./demoStationsStatus";
function WelcomeTour({ isOpen, onClose }) {
  const steps = [
    {
      selector: "",
      content: (
        <p style={{ fontFamily: "Roboto" }}>
          <h2>
            ¡Bienvenido a <b>Gaming Quarters!</b>
          </h2>
          En este nuestro sitio, aquí uedes checar si hay lugar para jugar{" "}
          <b style={{ color: "green" }}>sin que tengas que salir de tu casa.</b>
        </p>
      ),
    },
    {
      selector: ".Station:nth-child(1)",
      content: () => (
        <p style={{ fontFamily: "Roboto" }}>
          Así se ve una estación cuando está disponible para jugar.
        </p>
      ),
      position: "bottom",
    },
    {
      selector: ".Station:nth-child(2)",
      content: () => (
        <p style={{ fontFamily: "Roboto" }}>
          Así se ve una estación cuando esta ocupada. Puedes ver en cuánto se
          desocupa y si hay alguien esperando por ella.
        </p>
      ),
      position: "top",
    },
    {
      selector: "[data-tour='enable-notifications']",
      content: () => (
        <p style={{ fontFamily: "Roboto" }}>
          ¡Recibe notificaciones cuando una estación esté disponbible!
        </p>
      ),
    },
  ];

  const tour = (
    <Tour
      accentColor="black"
      showNumber={false}
      steps={steps}
      isOpen={isOpen}
      onRequestClose={onClose}
    />
  );

  return (
    <>
      {tour}
      <Stations
        stationsStatus={demoStationsStatus.map(utils.parseStationStatus)}
      />
    </>
  );
}

WelcomeTour.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default WelcomeTour;
