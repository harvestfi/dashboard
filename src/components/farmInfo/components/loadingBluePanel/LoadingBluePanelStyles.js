import styled from 'styled-components';

const LoadingBluePanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 10rem;
  background: none;
  border: ${props => props.theme.style.mainBorder};
  box-shadow: ${props => props.theme.style.panelBoxShadow};
  border-radius: 0.5rem;
  overflow: hidden;

  &::before {
    content: '';
    position: relative;
    left: -150px;
    top: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      to right,
      transparent 10%,
      ${props => props.theme.style.blueBackground} 50%,
      transparent 100%
    );
    animation: load 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes load {
    from {
      left: -100%;
    }
    to {
      left: 100%;
    }
  }

  @media (max-width: 1107px) {
    height: 10rem;
  }
`;

export default LoadingBluePanel;
