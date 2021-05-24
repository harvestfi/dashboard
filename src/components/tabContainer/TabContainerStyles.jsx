import styled from 'styled-components'
import { fonts } from '../../App/styles/appStyles'

export const PanelTab = styled.div`
  margin-right: 0.75rem;
  border-radius: 1.2rem;
  border-top: ${(props) => props.theme.style.mainBorder};
  border-left: ${(props) => props.theme.style.mainBorder};
  border-right: ${(props) => props.theme.style.mainBorder};
  padding: 0.75rem 2rem 1rem 2rem;
  background-color: ${(props) => props.theme.style.highlight};
  box-shadow: ${(props) => props.theme.style.panelTabBoxShadow};

  cursor: pointer;
  color: ${(props) => props.theme.style.buttonFontColor};

  a {
    color: ${(props) => props.theme.style.panelTabLinkColor};
    text-decoration: none;
    font-family: ${fonts.contentFont};
    font-size: 2.4rem;
    position: relative;
    top: 0.1rem;
    @media (max-width: 500px) {
      font-size: 1.5rem;
      top: 0.3rem;
    }
  }

  &.wiki-tab {
    position: relative;
    background-color: ${(props) => props.theme.style.wikiTabBackground};
    top: 0.4rem;
    margin-left: 1rem;

    &:hover {
      top: 0rem;
    }

    a {
      color: ${(props) => props.theme.style.primaryFontColor};
      font-size: 1.9rem;
      position: relative;
      top: 0.1rem;
    }
    @media (max-width: 1160px) {
      display: none;
    }
  }

  &.radio-tab {
    position: relative;
    font-size: 1.9rem;
    top: 0.6rem;
    margin-left: 1rem;
    font-family: ${fonts.contentFont};
    &:hover {
      top: 0rem;
    }

    @media (max-width: 1160px) {
      display: none;
    }
  }

  &.analytics-tab {
    position: relative;
    background-color: ${(props) => props.theme.style.wikiTabBackground};
    top: 0.5rem;
    margin-left: 1rem;
    z-index: 30;

    &:hover {
      top: 0rem;
    }

    p {
      color: ${(props) => props.theme.style.primaryFontColor};
      font-family: ${fonts.contentFont};
      font-size: 1.9rem;
      position: relative;
      top: -0.1rem;
    }
    @media (max-width: 1160px) {
      display: none;
    }
  }
`

export const PanelTabContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const PanelTabContainerLeft = styled.div`
  display: flex;
  justify-content: flex-start;
`

export const PanelTabContainerRight = styled.div`
  display: flex;
  justify-content: flex-end;
`
