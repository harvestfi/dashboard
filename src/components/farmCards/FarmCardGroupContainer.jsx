import React, { useEffect, useContext, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import harvest from '../../lib/index';
import HarvestContext from '../../Context/HarvestContext';
import { darkTheme, lightTheme } from '../../styles/appStyles';
import FarmCard from './FarmCard';
import {
  FarmGroupContainerWrapper,
  NoFarmSummariesFound,
  PanelTab,
  Tabs,
  PanelTabContainerLeft,
  PanelTabContainerRight,
} from './FarmCardStyles';
import {} from '../farmingTable/FarmingTableStyles';

const { utils } = harvest;

function FarmCardGroupContainer({ showAsTables }) {
  const { state, setState, isRefreshing, isCheckingBalance, refresh } = useContext(HarvestContext);

  const getTotalFarmEarned = useCallback(() => {
    let total = 0;
    if (state.summaries.length) {
      state.summaries.map(utils.prettyPosition).forEach(summary => {
        total += parseFloat(summary.historicalRewards);
        setState(prevState => ({
          ...prevState,
          totalFarmEarned: total,
        }));
      });
    }
  }, [setState, state.summaries]);

  useEffect(() => {
    getTotalFarmEarned();
  }, [state.summaries, getTotalFarmEarned]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getTotalFarmEarned();
    }, 60000);
    return () => clearTimeout(timer);
  });

  return (
    <ThemeProvider theme={state.theme === 'dark' ? darkTheme : lightTheme}>
      <Tabs>
        <PanelTabContainerLeft>
          <PanelTab>
            <p>your staked assets</p>
          </PanelTab>
        </PanelTabContainerLeft>
        <PanelTabContainerRight>
          <PanelTab
            className={isRefreshing ? 'refresh-disabled' : 'refresh-button'}
            onClick={showAsTables}
          >
            <i className="fas fa-table" />
          </PanelTab>
          {isCheckingBalance ? (
            ''
          ) : (
            <PanelTab
              className={isRefreshing ? 'refresh-disabled' : 'refresh-button'}
              onClick={refresh}
            >
              <i className="fas fa-sync-alt" />
            </PanelTab>
          )}
        </PanelTabContainerRight>
      </Tabs>

      {state.summaries.length ? (
        <FarmGroupContainerWrapper>
          {state.summaries.map(utils.prettyPosition).map(summary => {
            return <FarmCard key={summary.address} summary_information={summary} />;
          })}
        </FarmGroupContainerWrapper>
      ) : (
        <NoFarmSummariesFound>
          You currently are not staking any assets{' '}
          <span role="img" aria-label="desert emoji">
            🏜️
          </span>
        </NoFarmSummariesFound>
      )}
    </ThemeProvider>
  );
}

export default FarmCardGroupContainer;
