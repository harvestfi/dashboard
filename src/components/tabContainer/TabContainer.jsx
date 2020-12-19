import React, { useContext } from "react";
import HarvestContext from "../../Context/HarvestContext";
import styled from "styled-components";
import { fonts } from "../../styles/appStyles";

const TabContainer = () => {
  const { state, setState, toggleRadio } = useContext(HarvestContext);

  const toggleTheme = (theme) => {
    setState({ ...state, theme: theme });
    window.localStorage.setItem("HarvestFinance:Theme", theme);
  };
  return (
    <PanelTabContainer>
      <PanelTabContainerLeft>
        <PanelTab>
          <a
            href="https://harvest.finance"
            target="_blank"
            rel="noopener noreferrer"
          >
            harvest.finance
          </a>
        </PanelTab>
        <PanelTab className="wiki-tab">
          <a
            href="https://farm.chainwiki.dev/en/home"
            target="_blank"
            rel="noopener noreferrer"
          >
            wiki
          </a>
        </PanelTab>

        <PanelTab className="analytics-tab">
          <a
            href="https://farmdashboard.xyz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            analytics
          </a>
        </PanelTab>

        <PanelTab className="radio-tab" onClick={toggleRadio}>
          <p>radio</p>
        </PanelTab>
      </PanelTabContainerLeft>

      <PanelTabContainerRight>
        <PanelTab className="switch-panel">
          <label className="switch">
            <input
              type="checkbox"
              checked={state.theme === "dark" ? true : false}
              onChange={() =>
                toggleTheme(state.theme === "dark" ? "light" : "dark")
              }
            />
            <span className="slider round"></span>
          </label>
        </PanelTab>
      </PanelTabContainerRight>
    </PanelTabContainer>
  );
};

export default TabContainer;

const PanelTab = styled.div`
  margin-right: 0.75rem;
  border-radius: 1.2rem;
  border-top: ${(props) => props.theme.style.mainBorder};
  border-left: ${(props) => props.theme.style.mainBorder};
  border-right: ${(props) => props.theme.style.mainBorder};
  padding: 0.75rem 2rem 2.25rem 2rem;
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
    top: .1rem;
    @media(max-width: 500px) {
      font-size: 1.5rem;
      top: .3rem;
    }
    
   
  }
  @media(max-width: 700px) {
    font-size: 1.6rem;
    padding: 0.75rem 1rem 2.2rem 1rem;
    position: relative;
    top: .1rem;
    
  }
  @media(max-width: 550px) {
    margin-right: .5rem;
  }
  @media(max-width: 380px) {
    font-size: 1.2rem;
    padding: 0.75rem .5rem 2rem .5rem;
    position: relative;
    margin-right: .0rem;
    top: .5rem;
    a {
      top: .4rem;
    }
  }
  @media(max-width: 333px) {
    
  }
  

  &.wiki-tab {
    position: relative;
    background-color: ${(props) => props.theme.style.wikiTabBackground};
    top: 0.4rem;
    margin-left: 2.5rem;
    

    &:hover {
      top: 0rem;
    }

    a {
      color: ${(props) => props.theme.style.primaryFontColor};
      font-size: 1.9rem;
      position: relative;
      top: .1rem;
    }
    @media(max-width: 575px) {
      
      margin-left: .5rem;
     
      
    }
   
    @media(max-width: 500px) {
      top: 1.3rem;
      margin-left: .5rem;
      a {
        font-size: 1.5rem;
        top: -.1rem;;
      }
      
    }
    @media(max-width: 380px) {
      margin-left: 0;
      a {
        font-size: 1.4rem;
      }
      
    };
    @media(max-width: 333px) {
      margin-right: .3rem;
    }
  }

  &.analytics-tab {
    position: relative;
    background-color: ${(props) => props.theme.style.wikiTabBackground};
    top: 0.5rem;
    margin-left: 2.5rem;
    

    &:hover {
      top: 0rem;
    }

    a {
      color: ${(props) => props.theme.style.primaryFontColor};
      font-size: 1.9rem;
      position: relative;
      top: .1rem;
    }
    @media(max-width: 675px) {
      
      margin-left: .5rem;
     
      
    }
   
    @media(max-width: 500px) {
      top: 1.3rem;
      margin-left: .5rem;
      a {
        font-size: 1.5rem;
        top: -.1rem;;
      }
      
    }
    @media(max-width: 380px) {
      margin-left: 0;
      a {
        font-size: 1.4rem;
      }
      
    };
    @media(max-width: 333px) {
      margin-right: .3rem;
    }
  }
    &.switch-panel {
      margin-right: 1.2rem;
      position: relative;
      top: .6rem;
      padding: 0.4rem .5rem 1rem .5rem;

      @media(max-width: 500px) {
        top: 1.2rem;
        margin-left: 1rem;
        padding: 0.4rem .5rem 3rem .5rem;
      }
      @media(max-width: 380px) {
        top: 1.4rem;
      }
      @media(max-width: 380px) {
        top: 1.4rem;
        margin-left: .5rem;
      }
      
    }

    &.radio-tab {
      position: relative;
      font-size: 1.9rem;
      top: .6rem;
      margin-left: 2.5rem;
      font-family: ${fonts.contentFont};
      &:hover {
        top: 0rem;
      }

      @media(max-width: 700px) {
        margin-left: .5rem;
        p {
          font-size: 1.9rem;
        }
        
      }

      @media(max-width: 500px) {
        top: 1.4rem;
        margin-left: 1rem;
        p {
          font-size: 1.5rem;
        }
        
      }
      @media(max-width: 380px) {
        margin-left: 0;
        p {
          font-size: 1.4rem;
        }
        
      }
      @media(max-width: 333px) {
        margin-left: .3rem;
      }
  
`;

const PanelTabContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PanelTabContainerLeft = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const PanelTabContainerRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;
