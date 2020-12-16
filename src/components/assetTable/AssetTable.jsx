import React from "react";
import DataTable from "react-data-table-component";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";
import AssetTableSkeleton from "./AssetTableSkeleton";
import harvest from "../../lib/index.js";
const { ethers } = harvest;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100.3%;

  div[role="table"] {
    background-color: ${(props) => props.theme.style.panelBackground};

    padding-right: 0.35rem;
    padding-bottom: 0.35rem;
  }

  .rdt_TableHeadRow {
    border: ${(props) => props.theme.style.mainBorder};
    box-shadow: ${(props) => props.theme.style.panelBoxShadow};
    background-color: ${(props) => props.theme.style.lightBackground};
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
  }

  .rdt_TableBody {
    border-left: ${(props) => props.theme.style.mainBorder};
    border-right: ${(props) => props.theme.style.mainBorder};
    border-bottom: ${(props) => props.theme.style.mainBorder};
    box-shadow: ${(props) => props.theme.style.panelBoxShadow};
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  .rdt_TableRow {
    font-family: ${fonts.contentFont};
    color: ${(props) => props.theme.style.primaryFontColor};
    background-color: ${(props) => props.theme.style.lightBackground};
    padding: 1rem;
    font-size: 1.7rem;
  }

  div[role="columnheader"] {
    color: ${(props) => props.theme.style.primaryFontColor};
    font-family: ${fonts.headerFont};
    font-size: 2rem;
    padding: 1rem 0.5rem;
    letter-spacing: -1px;

    &:hover,
    &:visited,
    &:active,
    &:focus {
      color: ${(props) => props.theme.style.primaryFontColor};
    }
  }
`;

const noAssetColumns = [
  {
    name: "You currently have no assets",
    // selector: (data) => data.asset.name,
    selector: "asset",
    center: true,
  },
];
const noAssetData = [
  {
    id: 0,
    asset: "Add assets to get started",
  },
];
const columns = [
  {
    name: "Asset",
    selector: (data) => data.asset.name,
    center: true,
  },
  {
    name: "Underlying Balance",
    selector: (data) =>
      ethers.utils.formatUnits(data.balance, data.asset.decimals),
    center: true,
  },
];

const AssetTable = ({ state }) => {
  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      {state.display ? (
        <TableContainer>
          {state.underlyings.length ? (
            <DataTable
              noHeader={true}
              noDivider={true}
              columns={columns}
              noDataComponent={false}
              data={state.underlyings}
              overflowY={true}
            />
          ) : (
            <DataTable
              noHeader={true}
              noDivider={true}
              columns={noAssetColumns}
              noDataComponent={false}
              data={noAssetData}
            />
          )}
        </TableContainer>
      ) : (
        <AssetTableSkeleton state={state} />
      )}
    </ThemeProvider>
  );
};

export default AssetTable;
