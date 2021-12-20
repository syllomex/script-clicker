import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;

  .circle {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
  }

  .experience {
    background-color: var(--primary);
  }

  .experience-text {
    color: var(--primary);
  }

  .commit {
    background-color: var(--commit);
  }

  .commit-text {
    color: var(--commit);
  }

  .amount {
    font-size: 3.2rem;
    margin-left: 1.6rem;
  }
`;
