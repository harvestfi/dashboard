import styled from 'styled-components';
import { fonts } from '../../styles/appStyles';

export const TableContainer = styled.div`
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

export const MainTableInner = styled.div`
	width: 100%;
	margin: 0 auto;
	overflow-x: scroll;
	scrollbar-color: ${props => props.theme.style.scrollBarColor};
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
export const MainTableRow = styled.div`
	display: grid;
	grid-template-columns: 0.75fr 0.3fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr;
	font-size: 1.7rem;
	align-items: center;
	font-family: ${fonts.contentFont};
	padding: 1.5rem 1rem;
	width: 100%;
	border-bottom: 1.2px solid rgba(53, 53, 53, 0.15);
	@media (max-width: 1920px) {
		width: 100%;
	}
	@media (max-width: 1280px) {
		width: 110%;
	}

	div {
		text-align: center;
		width: 100%;
	}
	.name {
	}
	.active {
	}
	.earned-rewards {
		cursor: pointer;
		transition: scale 200ms ease;
		border-radius: 0.5rem;
		margin-right: 2rem;
		&:hover {
			width: 35%;
			margin: 0 auto;
			transform: scale(1.1);
		}
	}
	.staked {
	}
	.pool {
	}
	.unstaked {
		@media (max-width: 1280px) {
			margin-left: 1.5rem;
		}
	}
	.value {
		margin-left: 1rem;
		@media (max-width: 1280px) {
			margin-left: 1.5rem;
		}
	}
	.underlying {
	}
	.stake-but {
		margin-right: 10px;
	}

	input {
		height: 30px;
		font-weight: bold;
	}
	button {
		font-family: 'Open Sans' !important;
		position: relative;
		&:hover:enabled {
			top: 1.5px;
		}
		&:disabled {
			background-color: ${({ theme }) => theme.style.buttonDisabledBackground};
			color: ${({ theme }) => theme.style.buttonDisabledFontColor};
		}
	}
`;
export const MainTableHeader = styled.div`
	display: grid;
	grid-template-columns: 0.75fr 0.3fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr;
	//grid-gap: 20px;
	font-size: 1.7rem;
	font-family: ${fonts.headerFont};
	padding: 1.5rem 1rem;
	border-bottom: 2px black solid;
	width: 100%;
	@media (max-width: 1280px) {
		width: 110%;
	}

	div {
		text-align: center;
		width: 100%;
	}
	.table-header {
		cursor: pointer;
	}
`;

export const PanelTabContainerLeft = styled.div`
	display: flex;
	justify-content: flex-start;
`;
export const PanelTabContainerRight = styled.div`
	display: flex;
	justify-content: flex-end;
`;
export const Tabs = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const PanelTab = styled.div`
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
	&.refresh-button {
		cursor: pointer;
		top: 1.7rem;
		.fas {
			font-size: 1.7rem;
		}
		&:hover {
			top: 1.9rem;
		}
		&:active {
			color: ${props => props.theme.style.blueBackground};
			transform: scale(1.1);
			transition: all 0.1s ease;
		}
	}
	&.refresh-disabled {
		cursor: none;
		pointer-events: none;
		top: 1.7rem;
		.fas {
			font-size: 1.7rem;
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
