import React, { useCallback, useRef } from "react";
import Image from "next/image";

import Title from "../title";
import Circle from "../circle";

import { useGame } from "../../context/game";

import { Container } from "./styles";

import enter from "../../assets/images/enter.png";

const Player: React.FC = () => {
  const { data, increaseExp, increaseCommits } = useGame();

  const floatingNumbersContainer = useRef<HTMLDivElement>(null);

  const createFloatingNumber = useCallback(() => {
    if (!floatingNumbersContainer.current) return;

    const floatingNumber = document.createElement("div");
    floatingNumber.innerHTML = `<span>+${data.experiencePerClick}</span>`;

    floatingNumber.classList.add("floating-number");

    const randomLeft = Math.random() * 25 + 25;

    floatingNumber.style.left = `${randomLeft}%`;

    floatingNumber.addEventListener("animationend", () => {
      floatingNumbersContainer.current?.removeChild(floatingNumber);
    });

    floatingNumbersContainer.current.appendChild(floatingNumber);
  }, [data.experiencePerClick]);

  const handleClick = useCallback(() => {
    increaseExp({});
    increaseCommits({});
    createFloatingNumber();
  }, [createFloatingNumber, increaseCommits, increaseExp]);

  return (
    <Container>
      <div>
        <Title>{data.developersName}</Title>

        <div className="image-container" onClick={handleClick}>
          <div ref={floatingNumbersContainer} />
          <Image
            src={enter}
            width={128}
            height={128}
            alt="Keyboard enter"
            layout="fixed"
            className="image"
            priority
          />
        </div>
      </div>
      <div>
        <Circle amount={data.experience} type="experience" />
      </div>
    </Container>
  );
};

export default Player;
