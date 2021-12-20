import React from "react";
import { useGame } from "../../context/game";
import Circle from "../circle";

import { Container } from "./styles";

const Projects: React.FC = () => {
  const { data } = useGame();

  return (
    <Container>
      <div></div>
      <div>
        <Circle amount={Math.floor(data.commits)} type="commit" />
      </div>
    </Container>
  );
};

export default Projects;
