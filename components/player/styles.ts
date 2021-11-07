import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  flex-grow: 1;
  justify-content: space-between;

  @keyframes pulse {
    from {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    to {
      opacity: 0.6;
    }
  }

  @keyframes fade-up {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-40px);
      opacity: 0;
    }
  }

  .floating-number {
    position: absolute;
    animation: fade-up 1s;

    top: 50px
  }

  .image-container {
    user-select: none;

    margin-top: 6.4rem;
    
    padding: 8rem;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);

    cursor: pointer;

    box-shadow: 0 0 70px -40px;

    animation: pulse 4s infinite;
    transition-duration: 0.2s;

    &:hover {
      transform: scale(1.02);
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;
