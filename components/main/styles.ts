import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-column-gap: 2rem;
  grid-template-columns: 1fr 1fr 1fr;

  width: 100vw;
  height: 100vh;

  .column {
    display: flex;
    flex-direction: column;

    align-items: center;

    background-color: var(--background-dark);

    padding: 4.8rem 1.8rem;
  }
`;
