import React, { useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import HarvestContext from '../../Context/HarvestContext';
import { darkTheme, lightTheme, fonts } from '../../styles/appStyles';
import AssetTableSkeleton from './AssetTableSkeleton';
import harvest from '../../lib';

const { ethers } = harvest;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 3rem;
  border: ${props => props.theme.style.mainBorder};
  box-shadow: ${props => props.theme.style.panelBoxShadow};
  color: ${props => props.theme.style.primaryFontColor};
  background-color: ${props => props.theme.style.lightBackground};
  border-radius: 0.5rem;
  border-top-left-radius: 0rem;
  position: relative;
  z-index: 50;
`;

const PanelTabContainerLeft = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const PanelTab = styled.div`
  margin-right: 0.75rem;
  border-radius: 1.2rem;
  border-top: ${props => props.theme.style.mainBorder};
  border-left: ${props => props.theme.style.mainBorder};
  border-right: ${props => props.theme.style.mainBorder};
  padding: 0.75rem 2rem 2rem 2rem;
  background-color: ${props => props.theme.style.highlight};
  box-shadow: ${props => props.theme.style.panelTabBoxShadow};
  position: relative;
  top: 1.2rem;
  color: ${props => props.theme.style.buttonFontColor};

  p {
    color: ${props => props.theme.style.panelTabLinkColor};
    text-decoration: none;
    font-family: ${fonts.contentFont};
    font-size: 2rem;
    position: relative;
    top: 0.1rem;
    @media (max-width: 500px) {
      font-size: 1.5rem;
      top: 0.3rem;
    }
  }
  @media (max-width: 605px) {
    font-size: 1.9rem;
    padding: 0.75rem 1rem 2.2rem 1rem;
    position: relative;
    top: 1rem;
  }
  @media (max-width: 550px) {
    margin-right: 0.5rem;
  }
  @media (max-width: 380px) {
    font-size: 1.5rem;
    padding: 0.75rem 0.75rem 2rem 0.75rem;
    position: relative;
    margin-right: 0.5rem;
    top: 0.5rem;
    p {
      top: 0.4rem;
    }
  }
  @media (max-width: 333px) {
    margin-right: 0.3rem;
  }
`;

const columns = [
  {
    name: 'Asset',
  },
  {
    name: 'Underlying Balance',
  },
];

const AssetTable = () => {
  const { state } = useContext(HarvestContext);

  return (
    <ThemeProvider theme={state.theme === 'dark' ? darkTheme : lightTheme}>
      {state.display ? (
        <PanelTabContainerLeft>
          <PanelTab>
            <p>your underlying assets</p>
          </PanelTab>
        </PanelTabContainerLeft>
      ) : null}

      {state.display ? (
        <TableContainer>
          {state.underlyings.length ? (
            <MainTableInner>
              <MainTableHeader>
                {columns.map((col, i) => {
                  return (
                    <p className={col.name} key={i}>
                      {col.name}
                    </p>
                  );
                })}
              </MainTableHeader>
              {state.underlyings.map((underlying, i) => {
                const sum = ethers.utils.formatUnits(underlying.balance, underlying.asset.decimals);
                return (
                  <MainTableRow key={i}>
                    <div className="name">{underlying.asset.name}</div>
                    <div className="active">{parseFloat(sum).toFixed(6)}</div>
                  </MainTableRow>
                );
              })}
            </MainTableInner>
          ) : (
            <NoAssetTable>
              <div className="header">
                <p>You Currently have no assets</p>
              </div>
              <div className="content">
                <div className="name">
                  {' '}
                  <p>Add assets to get started</p>{' '}
                </div>
              </div>
            </NoAssetTable>
          )}
        </TableContainer>
      ) : (
        <AssetTableSkeleton state={state} />
      )}
    </ThemeProvider>
  );
};

export default AssetTable;

const MainTableInner = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow-x: scroll;
  text-align: center;
  scrollbar-color: ${({ theme }) => {
    return `${theme.style.scrollBarColor} ${theme.style.lightBackground}`;
  }};
  scrollbar-width: thin;
  ::-webkit-scrollbar {
    width: 100%;
    height: 0.8rem;
    margin-top: -1.8rem;
  }
  ::-webkit-scrollbar-track:no-button {
    width: 100%;
    border-radius: 0.5rem;
    background-color: ${props => props.theme.style.lightBackground};
  }
  ::-webkit-scrollbar-button {
    color: ${props => props.theme.style.primaryFontColor};
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: black;
    background-color: ${props => props.theme.style.scrollBarColor};
  }
`;
const MainTableRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  justify-items: center;
  font-size: 1.7rem;
  font-family: ${fonts.contentFont};
  padding: 1.5rem 1rem;
  width: 100%;
  border-bottom: 1.2px solid rgba(53, 53, 53, 0.15);

  div {
    text-align: center;
    width: 100%;
  }
`;
const MainTableHeader = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  justify-items: center;
  grid-gap: 20px;
  font-size: 2rem;
  font-family: ${fonts.headerFont};
  padding: 1.5rem 1rem;
  border-bottom: 2px black solid;
  width: 100%;

  p {
    text-align: center;
    width: 100%;
  }
`;

const NoAssetTable = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .header {
    font-size: 2rem;
    font-family: ${fonts.headerFont};
    padding: 1.5rem 1rem;
    border-bottom: 2px black solid;
    width: 100%;
    p {
      text-align: center;
    }
  }
  .content {
    width: 100%;
    font-size: 1.7rem;
    font-family: ${fonts.contentFont};
    padding: 1.5rem 1rem;
    width: 100%;
    border-bottom: 1.2px solid rgba(53, 53, 53, 0.15);
    p {
      text-align: center;
    }
  }
`;
