import React from "react";

import { Container } from "./styles";

type Props = {
  amount: number;
};

const Experience: React.FC<Props> = ({ amount }) => {
  return <Container>
    <div className="circle" />
    <span className="amount">{Intl.NumberFormat("pt-BR").format(amount)}</span>
  </Container>;
};

export default Experience;
