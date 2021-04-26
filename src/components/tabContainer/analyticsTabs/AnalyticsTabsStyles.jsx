import styled from 'styled-components'

export const AnalyticsContainer = styled.div`
  display: flex;
  align-items: baseline;

  .analytics-tab {
    position: absolute;
    margin-left: -6rem;
    z-index: 1;
    top: 0.6;
    width: max-content;
    transition: margin-left 0.2s ease-in, width 0.25s ease-in;
    a {
      color: ${(props) => props.theme.style.primaryFontColor};
      font-size: 1.9rem;
      position: relative;
      top: 0.1rem;
      transition: all 0.2s ease-in;
      &:hover {
        border-bottom: 1px solid black;
      }
    }

    &:hover {
      cursor: pointer;
      top: -0.1rem;
    }
  }

  .unfolded {
    position: relative;
    &:hover {
      margin-right: 0;
      margin-left: 0.1rem;
      top: 0.2rem;
    }
  }
  .folded {
    opacity: 0;
  }

  .second {
    margin-left: -5rem;
    z-index: -12;
  }
  .third {
    margin-left: -4rem;
    z-index: -14;
  }
  .fourth {
    margin-left: -3rem;
    z-index: -16;
  }
  .unfolded-first {
    z-index: 10;
    margin-left: 0.1rem;
  }
  .unfolded-second {
    margin-right: 1.5rem;
    z-index: 9;
  }
  .unfolded-third {
    margin-right: 1.5rem;
    z-index: 8;
  }
  .unfolded-fourth {
    margin-right: 1.5rem;
    z-index: 7;
  }
  @media (max-width: 1160px) {
    display: none;
  }
`
