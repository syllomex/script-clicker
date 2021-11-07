import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  .circle {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    background-color: var(--primary);
  }

  .amount {
    color: var(--primary);
    font-size: 3.2rem;
    margin-left: 1.6rem;
  }
`;
