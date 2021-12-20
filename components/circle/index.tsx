import React from "react";

import { Container } from "./styles";

type Props = {
  amount: number;
  type: 'experience' | 'commit';
};

const Circle: React.FC<Props> = ({ amount, type }) => {
  return (
    <Container>
      <div className={`circle ${type}`} />
      <span className={`amount ${type}-text`}>
        {Intl.NumberFormat("pt-BR").format(amount)}
      </span>
    </Container>
  );
};

export default Circle;
