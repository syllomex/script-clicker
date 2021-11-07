import React from "react";
import Player from "../player";

import { Container } from "./styles";

const Main: React.FC = () => {
  return (
    <Container>
      <div className="column">
        <Player />
      </div>

      <div className="column"></div>
      <div className="column"></div>
    </Container>
  );
};

export default Main;
