import React, { useCallback, useRef } from "react";
import Image from "next/image";

import Title from "../title";
import Experience from "../experience";

import { useGame } from "../../context/game";

import { Container } from "./styles";

import enter from "../../assets/images/enter.png";

const Player: React.FC = () => {
  const { data, increaseExp } = useGame();

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

  const increase = useCallback(() => {
    increaseExp();
    createFloatingNumber();
  }, [createFloatingNumber, increaseExp]);

  return (
    <Container>
      <div>
        <Title>{data.developersName}</Title>

        <div className="image-container" onClick={increase}>
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
        <Experience amount={data.experience} />
      </div>
    </Container>
  );
};

export default Player;
